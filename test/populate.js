// Override .babelrc
require("babel-register")({
	presets: ["es2017-node7", "react", "stage-1"],
	plugins: ["transform-decorators-legacy"]
});

const config = require("../app/config/server");
const Promise = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const axios = require("axios");
const Entry = require("../app/models/entry");

// Your models imported here

if (!config.DEBUG) {
	console.log("This script will not run in production environments");
	process.exit(1);
}

async function startDatabase() {
	if (!config.MONGODB_URI) return "WARNING: The Database is disabled";

	await new Promise(function(resolve, reject) {
		// MongoDB Event Handlers
		// mongoose.connection.on('connecting', function() { console.log('%s | Connecting to MongoDB...', (new Date()).toJSON()); });
		mongoose.connection.on("error", function(error) {
			console.error(
				"%s | Error in MongoDB connection: " + error,
				new Date().toJSON()
			);
			mongoose.disconnect();
		});
		mongoose.connection.on("disconnected", function() {
			console.log("%s | MongoDB disconnected!", new Date().toJSON(), "\n");
			mongoose.connect(config.MONGODB_URI);
		});

		mongoose.connect(config.MONGODB_URI, function(err) {
			if (err) reject();
			else resolve();
		});
	});
}

async function populateDatabase() {
	console.log("Populating the DB");

	// YOUR CODE HERE

	try {
		const response = await axios.get("https://classic.js.coach/react.json");
		if (!response || !response.data || !response.data.packages)
			throw new Error("Got invalid data from the server");
		const packages = response.data.packages.filter(p => p.downloads_svg);

		await Promise.map(packages, async project => {
			const response = await axios.get(
				`https://classic.js.coach/react/${project.slug}.json`
			);
			if (!response || !response.data || !response.data.readme)
				throw new Error("Got invalid data from the server");

			return Entry.create({
				name: project.name,
				repo: project.repo,
				lastChange: project.relative_modified_at,
				description: project.description,
				content: response.data.readme,
				image: project.downloads_svg || "-"
			});
		});
	} catch (err) {
		console.error("Content population failed", err);
	}
}

////////////////////////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////////////////////////

async function main() {
	await startDatabase();
	await populateDatabase();
	console.log("Done");
	process.exit(0);
}

main();
