// import config from 'config/server';
import express from "express";
// import { enforceAuth, updateSession } from '../lib/session';
import Entry from "../models/entry";

const router = express.Router();

router.get("/entries", [getEntries]);
// router.post('/posts', [ enforceAuth, registerEvent ]);

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

// export function registerEvent(req, res){
// 	if(!req.body.type || !req.body.text || eventTypes.includes(req.body.type))
// 		return res.status(406).send({error: "Invalid parameters"});

// 	updateSession(res, {_id: req.body.user});

// 	res.send({});
// }

export default router;
