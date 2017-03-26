// import config from '../config/server.js';
import User from '../models/user';
import EventModel from '../models/event';

export const eventTypes = ['register', 'login', 'delete'];

export async function createEvent(user, type, text, payload) {
	if (!user || !type) return false;
	else if (typeof user == 'string') {
		user = await User.findOne({ $or: [{ nick: user }, { _id: user }] }).lean().exec();
	}

	if (!user) return console.log("Skipping event creation (no user)");

	return EventModel.create({
		user,
		type,
		text,
		payload
	})
	.catch(err => {
		console.error("Unable to create the event", err);
	})
}
