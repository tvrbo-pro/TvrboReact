// session auth utilities
import config from '../config/server';
import jwt from 'jsonwebtoken';

export function decodeAuth(req, res, next) {
	if (!req.cookies || !req.cookies.jwt) {
		req.user = {};
		return next();
	}

	// decode
	const payload = jwt.verify(req.cookies.jwt, config.JWT_SECRET, {});
	if (typeof payload != 'object' || !payload._id) {
		req.user = {};
		return next();
	}

	req.user = payload;
	next();
}

export function enforceAuth(req, res, next) {
	if (!req.cookies || !req.cookies.jwt) {
		return res.status(403).send({ url: '/login' });
	}

	// decode
	const payload = jwt.verify(req.cookies.jwt, config.JWT_SECRET, {});
	if (typeof payload != 'object' || !payload._id) {
		return res.status(403).send({ url: '/login' });
	}
	req.user = payload;

	next();
}

export function updateSession(res, user) {
	if (!res || !res.cookie) return console.error("Invalid res object supplied to updateSession");

	const payload = {
		_id: user && user._id,
		name: user && user.name,
		email: user && user.email
	};
	const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.SESSION_MAX_AGE / 1000 }); // 30 min

	res.cookie('jwt', token, { maxAge: config.SESSION_MAX_AGE, httpOnly: !config.DEBUG, secure: !config.DEBUG });
}

export function clearSession(res) {
	if (res && res.clearCookie) res.clearCookie("jwt");
}
