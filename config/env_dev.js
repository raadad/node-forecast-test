var env = process.env;

module.exports = {
  port: 3000,
  forecast: {
  	timeout: 5000,
  	APIKey: process.env.FORECAST_API_KEY
  }
};


