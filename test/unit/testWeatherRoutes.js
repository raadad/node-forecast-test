var m;
var weatherRoutes = require('../../lib/routes/weatherRoutes')();
var should = require('should');



beforeEach(function(done){
	m = require('../mocks');
	done();
});


describe('usePrepare', function() {
	it('should have a weather namespace', function(done) {
		weatherRoutes.usePrepare(m.req, m.res, function() {
			should.exist(m.req.weather);	
			done();
		});
	});
});

describe('useLocation', function() {
	it('should ', function(done) {
		weatherRoutes.usePrepare(m.req, m.res, function() {
			should.exist(m.req.weather);	
			done();
		});
	});
});
