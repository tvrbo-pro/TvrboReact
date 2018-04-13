import config from "../config/server";
import express from "express";
// import Promise from 'bluebird';

import User from "../models/user";

import { enforceAuth, updateSession, clearSession } from "../lib/session";
import { createEvent } from "../lib/events";

// ROUTER
const router = express.Router();

// API DEFINITIONS
router.get("/users/me", [enforceAuth, getUser]);
router.get("/session", [enforceAuth, getSession]);
router.post("/session", [userLogin]);
router.post("/users", [userSignUp]);
router.put("/users/password", [passwordReset]);
router.put("/users/me", [enforceAuth, updateUser]);
router.delete("/session", [userLogout]);
router.delete("/users/me", [enforceAuth, removeAccount]);

async function getUser(req, res) {
	var user = await User.findById(req.user._id)
		.lean()
		.exec();
	if (!user) return res.status(404).send({ error: "Not found" });
	else if (user.state == "removed")
		return res.send({ error: "Your account has been removed" });

	// Refresh cookie
	updateSession(res, user);
	res.send(user);
}

async function getSession(req, res, next) {
	var user = await User.findById(req.user._id)
		.lean()
		.exec();
	if (!user) return res.send({ error: "Not found" });
	else if (user.state == "removed")
		return res.send({ error: "Your account has been removed" });

	// Refresh cookie
	updateSession(res, user);

	try {
		const state = {};

		// TODO: Generate the current state of a session here

		res.send(state);
	} catch (err) {
		next(err);
	}
}

async function userLogin(req, res) {
	if (!req.body.email || !req.body.email.toLowerCase || !req.body.password)
		return res.send({ error: "Provide your email and password to continue" });

	var user;

	try {
		user = await User.findOne({ email: req.body.email.toLowerCase() })
			.lean()
			.exec();

		// TODO: Use the authentication method of your choice here

		// Refresh cookie
		updateSession(res, user);
		createEvent(user, "login", `${user.nick} signed in`);

		res.send(user);
	} catch (err) {
		if (err) res.send({ error: (err && err.message) || err });
		else res.status(500).send({ error: "Internal error" });
		return;
	}
}

function userLogout(req, res) {
	clearSession(res);
	res.send({});
}

async function userSignUp(req, res) {
	if (
		!req.body.email ||
		!req.body.password ||
		!req.body.name ||
		!req.body.lastName
	)
		return res.send({ error: "Provide your data to continue" });

	try {
		const user = await User.create({
			email: req.body.email.toLowerCase(),
			name: req.body.name,
			lastName: req.body.lastName,
			state: "pending"
		});

		// TODO: Implement your validation logic here

		createEvent(user, "register", `${user.nick} has joined ${config.APP_NAME}`);
		res.send(user);
	} catch (err) {
		if (err && err.message) res.send({ error: err.message || err });
		else
			res.send({
				error: `Could not complete the register to ${config.APP_NAME}`
			});
	}
}

async function updateUser(req, res, next) {
	var updates = {};

	try {
		const user = await User.findById(req.user._id)
			.lean()
			.exec();
		if (!user) return res.send({ error: "Not found" });
		if (req.body.name) updates.name = req.body.name;
		if (req.body.lastName) updates.lastName = req.body.lastName;

		const newUser = await User.findByIdAndUpdate(user._id, updates, {
			new: true
		})
			.lean()
			.exec();
		if (!newUser) return res.send({ error: "Not found" });

		// Refresh cookie
		updateSession(res, newUser);
		res.send(newUser);
	} catch (err) {
		next(err);
	}
}

async function passwordReset(req, res) {
	if (!req.body.email)
		return res.status(406).send({ error: "Invalid parameters" });

	try {
		// TODO: Implement your logic here

		res.send({});
	} catch (err) {
		res
			.status(500)
			.send({
				error: (err && err.message) || "No se ha podido completar la petición"
			});
	}
}

function removeAccount(req, res) {
	// TODO: Implement your logic here

	res.send({});
}

export default router;
