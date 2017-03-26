'use strict';

// Override .babelrc
require("babel-register")({
  presets: ["es2017-node7", "react", "stage-1"],
  plugins: ["transform-decorators-legacy"]
});

var config = require('./app/config/server');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// MAIN ROUTINE
function startServer(){
  var server = require('./app/server.jsx');

  server.listen(config.HTTP_PORT, function() {
    console.log((new Date()).toJSON() + " | " + config.APP_NAME + " listening on port " + config.HTTP_PORT);
  });

  startDatabase();
  initTerminationHandlers();
}

// MONGODB START
function startDatabase(){
  if(!config.MONGODB_URI) return console.log("WARNING: The Database is disabled");

  // Check that the server is listening
  var net = require('net');
  var sock = new net.Socket();
  const mongoUri = require('url').parse(config.MONGODB_URI);

  var timeout = 2000;
  sock.setTimeout(timeout, function() { sock.destroy(); });
  sock.connect(mongoUri.port, mongoUri.hostname, function() {
    // THE PORT IS LISTENING
    sock.destroy();

    // MongoDB Event Handlers
    mongoose.connection.on('connecting', function() { console.log('%s | Connecting to MongoDB...', (new Date()).toJSON()); });
    mongoose.connection.on('error', function(error) {
      console.error('%s | Error in MongoDB connection: ' + error, (new Date()).toJSON());
      mongoose.disconnect();
    });
    mongoose.connection.on('connected', function() { console.log('%s | MongoDB connected', (new Date()).toJSON()); });
    mongoose.connection.once('open', function() { console.log('%s | MongoDB connection opened', (new Date()).toJSON(), "\n"); });
    mongoose.connection.on('reconnected', function() { console.log('%s | MongoDB reconnected', (new Date()).toJSON(), "\n"); });
    mongoose.connection.on('disconnected', function() {
      console.log('%s | MongoDB disconnected!', (new Date()).toJSON(), "\n");
      mongoose.connect(config.MONGODB_URI, {server: {auto_reconnect:true}});
    });

    mongoose.connect(config.MONGODB_URI, {server: {auto_reconnect:true}});
  });
  sock.on('data', function() { sock.destroy(); });
  sock.on('error', function(e) {
    console.error("-----");
    console.error("ERROR: The MongoDB Server is not available");
    console.error(e.toString ? e.toString() : e);
    console.error("-----");
    sock.destroy();
    process.exit();
  });
}

// TERMINATION HANDLERS
function initTerminationHandlers(){
    process.on('exit', function() { terminator(); });

    const signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
      'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGTERM' //, 'SIGUSR2'
    ];

    // Removed 'SIGPIPE' from the list - bugz 852598.
    signals.forEach(function(element) {
        process.on(element, function() { terminator(element); });
    });
}

// TERMINATION CALLBACK
function terminator(signal){
    if(!signal || typeof signal != "string") return console.log('%s | The app is terminating...', (new Date()).toJSON());

    console.log('%s | Received %s...', (new Date()).toJSON(), signal);
    process.exit(1);
}

// INIT
startServer();
