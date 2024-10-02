const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('./utilities/logger')
const healthcheck = require('./utilities/healthcheck')
const redis = require('./database/redis')

const app = express()

logger.log({
  level: 'info',
  message: `Starting server on port: ${process.env.PORT || 8080}`,
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

require('./routes/index')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

logger.log({
  level: 'info',
  message: 'Server started...',
})

async function redisHealthCheck() {
  const response = await healthcheck.pingRedis();
  logger.info(JSON.stringify(response, null, 2));
}

redisHealthCheck();

redis.setWithExpiry('timer', '23', 1000);

module.exports = app
