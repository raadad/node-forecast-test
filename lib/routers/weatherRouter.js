var express = require('express'),
    chrono = require('chrono-node');



module.exports = function(weatherRoutes) {

    var app = express.Router();
    app.use("/", weatherRoutes.usePrepare);
    app.use("/:location", weatherRoutes.useLocation);
    app.get("/:location", weatherRoutes.getLocation);
    app.use("/:location/:time", weatherRoutes.useLocationTime);
    app.get("/:location/:time", weatherRoutes.getLocationTime);

    return app;
};
