module.exports = function(geocoder, forecast) {
    var _this = this;

    _this.geocode = function(location, cb) {
        geocoder.geocode(location, function(err, data) {
            cb(err, data.results[0]);
        });
    };

    _this.get = function(lat, lng, cb) {
        forecast.get(lat, lng, function(err, res, data) {
            cb(err, data);
        });
    };

    _this.getAtTime = function(lat, lng, time, cb) {
        forecast.getAtTime(lat, lng, time, function(err, res, data) {
            cb(err, data);
        });
    };

    return _this;
};
