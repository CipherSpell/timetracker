/**
  * Centralized file to init routes
  * app.use(<base-route>, <router containing subroutes>)
  */
module.exports = (app) => {
  app.use('/', require('./root'));
  app.use('/users', require('./users'));
};
