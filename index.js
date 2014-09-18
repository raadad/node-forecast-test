var http = require('http');
var express = require('express');
var app = module.exports = express();
var debug = require('debug')('dev');
var _ = require('underscore');  

var Forecast = require('forecast.io');
var geocoder = require('geocoder');

if(! _.contains(['dev','test'],process.env.NODE_ENV)){
	console.log('ERROR: Environment must be seto eg - dev, test');
	process.exit(1);
}


require('./config')(app); 

var forecast = new Forecast(app.get('config').forecast); 
var weatherHandler =  new require('./lib/handlers/weatherHandler')(geocoder,forecast); 
var weatherRoutes = require('./lib/routes/weatherRoutes')(weatherHandler); 
var weatherRouter = require('./lib/routers/weatherRouter')(weatherRoutes);

app.set('views', __dirname + '/lib/views');
app.set('view engine', 'jade');
app.use('/weather', weatherRouter);

http.createServer(app).listen(app.get('port'), function() {
	debug('Application started on port %d', app.get('port'));
});


