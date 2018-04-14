import express from "express";
import { getState } from "../lib/intervals";

const router = express.Router();

// ROUTES

router.get("/price-bars/:pair", [getPairBars]);

// IMPLEMENTATION

export function getPairBars(req, res) {
	const state = getState();
	if (!req.params.pair || !req.params.pair.split) return res.send([]);

	const base = req.params.pair.split("-")[0];
	if (!base) return res.send([]);
	else if (!state.priceBars || !state.priceBars[base]) return res.send([]);
	else return res.send(state.priceBars[base]);
}

export default router;
