// Override .babelrc
require("babel-register")({
       presets: ["es2017-node7", "react", "stage-1"],
       plugins: ["transform-decorators-legacy"]
});

const config = require('../app/config/server');
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Your models imported here


if(!config.DEBUG){
	console.log("This script will not run in production environments");
	process.exit(1);
}

async function startDatabase(){
	if(!config.MONGODB_URI) return "WARNING: The Database is disabled";

	await new Promise(function(resolve, reject){
		// MongoDB Event Handlers
		// mongoose.connection.on('connecting', function() { console.log('%s | Connecting to MongoDB...', (new Date()).toJSON()); });
		mongoose.connection.on('error', function(error) {
			console.error('%s | Error in MongoDB connection: ' + error, (new Date()).toJSON());
			mongoose.disconnect();
		});
		mongoose.connection.on('disconnected', function() {
			console.log('%s | MongoDB disconnected!', (new Date()).toJSON(), "\n");
			mongoose.connect(config.MONGODB_URI, {server: {auto_reconnect:true}});
		});

		mongoose.connect(config.MONGODB_URI, {server: {auto_reconnect:true}}, function(err){
			if(err) reject();
			else resolve();
		});
	});
}

async function cleanDatabase(){
	console.log("Cleaning the DB");

	// Your code here
}

////////////////////////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////////////////////////

async function main(){
	await startDatabase();
	await cleanDatabase();
	console.log("Done");
	process.exit(0);
}

main();
