const router = require('express').Router();
const { authenticateJWT } = require('../middlewares/auth.mw');
const User = require('../models/User');

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

router.get('/', async (req, res) => {
  let result = await User.getAllUsers();
  res
    .status(200)
    .send(result);
})
/**
  * req.body -- passed as body on POST request
  * {
  *   "id": 2
  * }
  */
router.post('/addUser', async (req, res) => {
  const { email, password, firstName, lastName } = req.body; 

  await User.addUser(email, password, firstName, lastName);

  res
    .status(200)
    .send(`User added`);
});

router.get('/getUser/:email', authenticateJWT, async (req, res) => {
  const { email } = req.body;

  let result = await User.getUserbyEmail(email);

  res
    .status(200)
    .send(result);
})

module.exports = router;
