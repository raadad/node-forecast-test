var express = require('express');
var chrono = require('chrono-node');



module.exports = function(weatherRoutes) {

	var app = express.Router();

	app.use("/", weatherRoutes.usePrepare);
	app.use("/:location", weatherRoutes.useLocation);
	app.use("/:location/:time", weatherRoutes.useLocationTime);
	app.get("/:location/:time", weatherRoutes.getLocationTime);
	app.get("/:location/", weatherRoutes.getLocation);

	return app;
};