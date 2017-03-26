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
		return res.status(401).send({ url: '/login' });
	}

	// decode
	const payload = jwt.verify(req.cookies.jwt, config.JWT_SECRET, {});
	if (typeof payload != 'object' || !payload._id) {
		return res.status(401).send({ url: '/login' });
	}
	req.user = payload;

	next();
}

export function updateSession(res, user) {
	if (!res || !res.cookie) return console.error("Invalid res object supplied to updateSession");

	const payload = {
		_id: user && user._id,
		nom: user && user.nom,
		estat: user && user.estat,
		tipus: user && user.tipus,
		nick: user && user.nick,
		email: user && user.email
	};
	const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 60 * 30 }); // 30 min

	res.cookie('jwt', token, { maxAge: 1000 * 60 * 30, httpOnly: !config.DEBUG, secure: !config.DEBUG });
}

export function clearSession(res) {
	if (res && res.clearCookie) res.clearCookie("jwt");
}
