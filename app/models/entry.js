const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

var schema = new Schema(
	{
		name: { type: String, required: true },
		repo: { type: String, required: true },
		lastChange: { type: String, required: true },
		description: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String, required: true }
	},
	{
		collection: "entries"
	}
);

module.exports = mongoose.model("Entry", schema);
