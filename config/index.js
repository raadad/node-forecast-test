module.exports = function configuration (app) {

  if('dev' == process.env.NODE_ENV) {
    app.set('config', require('./env_dev'));
  }

  if('test' == process.env.NODE_ENV) {
    app.set('config', require('./env_test'));
  }

  app.set('port', app.get('config').port || 3000);
  
  app.use(function(err, req, res, next) {
    console.log('Some odd error: %j', err);
    next();
  });

};


