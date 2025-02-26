/**
  * Centralized file to init routes
  * app.use(<base-route>, <router containing subroutes>)
  */
module.exports = (app) => {
  app.use('/', require('./root'));
  app.use('/users', require('./users'));
  app.use('/timers', require('./timers'));
  app.use('/auth', require('./auth'));
  app.use('/tags', require('./tags'));
  app.use('/health', require('./health'));
};
