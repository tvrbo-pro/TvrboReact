// import config from 'config/server';
import express from 'express';
import { enforceAuth, updateSession } from '../lib/session';
import { createEvent, eventTypes } from '../lib/events';

const router = express.Router();

router.post('/events', [ enforceAuth, registerEvent ]);

export function registerEvent(req, res){
	if(!req.body.type || !req.body.text || eventTypes.includes(req.body.type))
		return res.status(406).send({error: "Invalid parameters"});

	createEvent(req.user, req.body.type, req.body.text, req.body.payload);
	updateSession(res, {_id: req.body.user});

	res.send({});
}

export default router;
