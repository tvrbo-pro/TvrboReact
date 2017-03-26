const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var schema = new Schema({
	user: { type: ObjectId, ref: 'User', required: true },
	type: {
		type: String,
		required: true,
		enum: [
			'register',
			'login',
			'delete'
		],
		lowercase: true
	},
	date: { type: Date, default: Date.now },
	text: { type: String, required: true },
	payload: {} // any data
}, {
	collection: 'events'
});

module.exports = mongoose.model('Event', schema);
