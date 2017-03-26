// Example usage assuming HTTP_PORT is set in default.js or in production.js:
//
//   if TVRBO_REACT_HTTP_PORT is set as an environment variable, config.HTTP_PORT will take its value
//   else if HTTP_PORT is set as an environment variable, config.HTTP_PORT will take its value
//   else if NODE_ENV=production and production.js contains the key, config.HTTP_PORT will take its value
//   else config.HTTP_PORT will take de value defined in default.js
//
// NOTE: Only keys defined in default.js/production.js will be used
//       Other environment variables will be ignored
//

if(global.WEBPACK) throw new Error("FATAL: SERVER CONFIG MUST NEVER BE INCLUDED FROM THE CLIENT SIDE");

const VAR_PREFIX = "TVRBO_REACT_";

const defaultConfig = require('./server-default.js');
const productionConfig = require('./server-production.js');

var config = {};

// Base config
if(process.env.NODE_ENV == 'production') {
	console.log("\nUsing production settings");
	config = Object.assign(config, defaultConfig, productionConfig);
}
else {
	config = defaultConfig;
}

// Environment variables will override existing keys
Object.keys(config).forEach(key => {
	if(typeof process.env[VAR_PREFIX + key] != 'undefined') {
		console.log("Using ENV variable", VAR_PREFIX + key);
		config[key] = process.env[VAR_PREFIX + key];
	}
	else if(typeof process.env[key] != 'undefined') {
		console.log("Using ENV variable", key);
		config[key] = process.env[key];
	}
}, {});

module.exports = config;
