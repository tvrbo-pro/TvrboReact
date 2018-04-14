"use strict";

// Override .babelrc
require("babel-register")({
	presets: ["es2017-node7", "react", "stage-1"],
	plugins: ["transform-decorators-legacy"]
});

const config = require("./app/config/server");
const throttle = require("lodash.throttle");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const app = require("./app/server.jsx");
const { initSocket } = require("./app/socket");
const { initIntervals } = require("./app/lib/intervals");
const { log, logError } = require("./app/lib/util");

// MAIN ROUTINE
function startServer() {
	initTerminationHandlers();

	startDatabase()
		.then(() => {
			// Start the web server
			const server = app.listen(config.HTTP_PORT, function() {
				log(config.APP_NAME + " listening on port " + config.HTTP_PORT);
			});

			// Start the web socket server
			initSocket(server);

			// Start the interval tasks
			initIntervals();
		})
		.catch(err => {
			logError("The server could not be started");
			logError(err);
			mongoose.disconnect();
			process.exit(1);
		});
}

// MONGODB START
function startDatabase() {
	if (!config.MONGODB_URI) return Promise.resolve();

	// MongoDB Event Handlers
	mongoose.connection.on("connecting", onDbConnecting);
	mongoose.connection.on("error", onDbConnectionError);
	mongoose.connection.on("connected", onDbConnected);
	mongoose.connection.once("open", onDbConnectionOpen);
	mongoose.connection.on("reconnected", onDbReconnected);
	mongoose.connection.on(
		"disconnected",
		throttle(onDbDisconnected, 1000, { leading: true })
	);

	// Connect
	return mongoose.connect(config.MONGODB_URI);
}

function onDbConnecting() {
	log("Connecting to MongoDB...");
}
function onDbConnectionError(error) {
	logError("Error in MongoDB connection: " + error);
	mongoose.disconnect();
}
function onDbConnected() {
	log("MongoDB connected");
}
function onDbConnectionOpen() {
	log("MongoDB connection opened", "\n");
}
function onDbReconnected() {
	log("MongoDB reconnected", "\n");
}
function onDbDisconnected() {
	log("MongoDB disconnected!", "\n");
	mongoose.connect(config.MONGODB_URI);
}

// TERMINATION HANDLERS
function initTerminationHandlers() {
	process.on("exit", function() {
		terminator();
	});

	var signals = [
		"SIGHUP",
		"SIGINT",
		"SIGQUIT",
		"SIGILL",
		"SIGTRAP",
		"SIGABRT",
		"SIGBUS",
		"SIGFPE",
		"SIGUSR1",
		"SIGSEGV",
		"SIGTERM" //, 'SIGUSR2'
	];

	// Removed 'SIGPIPE' from the list - bugz 852598.
	signals.forEach(function(element) {
		process.on(element, function() {
			terminator(element);
		});
	});
}

// TERMINATION CALLBACK
function terminator(signal) {
	if (!signal || typeof signal != "string")
		return log("The app is terminating...");

	mongoose.disconnect(); // graceful shutdown
	log(`Received ${signal}...`);
	process.exit(0);
}

// INIT
startServer();
