var http = require('http'),
express = require('express'),
app = module.exports = express(),
debug = require('debug')('dev'),
_ = require('underscore'),
Forecast = require('forecast.io'),
geocoder = require('geocoder');

if (!_.contains(['dev', 'test'], process.env.NODE_ENV)) {
    console.log('ERROR: Environment must be seto eg - dev, test');
    process.exit(1);
}

require('./config')(app);

var forecast = new Forecast(app.get('config').forecast),
weatherHandler = new require('./lib/handlers/weatherHandler')(geocoder, forecast),
weatherRoutes = require('./lib/routes/weatherRoutes')(weatherHandler),
weatherRouter = require('./lib/routers/weatherRouter')(weatherRoutes);

app.set('views', __dirname + '/lib/views');
app.set('view engine', 'jade');
app.use('/weather', weatherRouter);

http.createServer(app).listen(app.get('port'), function() {
    debug('Application started on port %d', app.get('port'));
});
