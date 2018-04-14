import { combineReducers } from "redux";
import app from "./app";
import entries from "./entries";
import coins from "./coins";
import prices from "./prices";
// import user from "./user";

export default combineReducers({
	app,
	entries,
	coins,
	prices
	// user,
});
