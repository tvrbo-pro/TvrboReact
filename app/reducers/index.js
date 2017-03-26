import { combineReducers } from 'redux';
import app from './app';
import usuari from './usuari';

export default combineReducers({
	app,
	usuari
});
