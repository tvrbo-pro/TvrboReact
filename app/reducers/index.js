import { combineReducers } from "redux";
import app from "./app";
import entries from "./entries";
import user from "./user";

export default combineReducers({
	app,
	user,
	entries
});
