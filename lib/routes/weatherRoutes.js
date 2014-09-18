var express = require('express');
var chrono = require('chrono-node');



module.exports = function(weatherHandler) {
	var _this = this;

	_this.usePrepare = function(req, res, next) {
		req.weather = {};
		next();
	};

	_this.useLocation = function(req, res, next) {
		req.weather.location = req.params.location;
		weatherHandler.geocode(req.params.location, function(err, data) {
			req.weather.geocode = data;
			next();
		});
	};

	_this.useLocationTime = function(req, res, next) {
		var splitTime = req.params.time.split('-').join(' ');
		req.weather.time = chrono.parseDate(splitTime);
		req.weather.unixTime = Math.round(+req.weather.time / 1000);
		req.weather.splitTime = splitTime;
		next();
	};

	_this.getLocationTime = function(req, res) {
		coords = req.weather.geocode.geometry.location;
		weatherHandler.getAtTime(coords.lat, coords.lng, req.weather.unixTime, function(err, weatherData) {
			var viewParams = {
				query: req.weather.location,
				geocode: req.weather.geocode,
				forecast: weatherData,
				time: req.weather.time,
				timeQuery: req.weather.splitTime
			};
			res.format({
				html: function() {
					res.render('weather-item-time', viewParams);
				},
				json: function() {
					res.send(JSON.stringify(viewParams));
				}
			});
		});

	};

	_this.getLocation = function(req, res) {
		coords = req.weather.geocode.geometry.location;
		weatherHandler.get(coords.lat, coords.lng, function(err, data) {
			var viewParams = {
				query: req.weather.location,
				geocode: res.weather.geocode,
				forecast: data,
			};

			res.format({
				html: function() {
					res.render('weather-item', viewParams);
				},
				json: function() {
					res.send(JSON.stringify(data));
				}
			});
		});
	};



	return _this;
};