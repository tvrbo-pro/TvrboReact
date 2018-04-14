import express from "express";
import Entry from "../models/entry";

const router = express.Router();

// ROUTES

router.get("/entries", [getEntries]);

// IMPLEMENTATION

export function getEntries(req, res) {
	return Entry.find()
		.lean()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({ error: err.message });
		});
}

export default router;
