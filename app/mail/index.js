const fs = require('fs');
import config from '../config/server';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport();
const imagePattern = /<img alt="[^"]*" src="[^"]*/ig;

const emailFrom = `${config.APP_NAME} <${config.EMAIL_FROM}>`;

// Mailing

function imgReplaceFunction(imgStr) {
	const matched = imgStr.match(/<img alt="[^"]*" src="([^"]*)/i);
	if (!matched) return imgStr;
	return {
		filename: matched[1],
		path: process.cwd() + '/app/mail/content/' + matched[1],
		cid: matched[1]
	}
}

function generateAssetsFromTemplate(file) {
	var result = {};
	if (!file || !fs.existsSync(file)) throw new Error("ERROR: Email template does not exist");

	const template = fs.readFileSync(file).toString();
	const images = template.match(imagePattern) || [];

	result.images = images.map(imgReplaceFunction);
	result.html = template.replace(/<img alt="([^"]*)" src="([^"]*)"/ig, "<img alt=\"$1\" src=\"cid:$2\"");
	return result;
}

// TEMPLATES

export function enviaMail(email, tipus, parametres) {
	var template;
	if (!email) return Promise.resolve();
	else if (config.DEBUG) email = config.DEBUG_NOTIFICATIONS_EMAIL;

	switch (tipus) {
		case 'received':
			if (!parametres.nick) return Promise.reject(new Error("Empty nick"));
			template = generateAssetsFromTemplate(process.cwd() + '/app/mail/content/reto-recibido.html');

			return transporter.sendMail({
				from: emailFrom,
				to: email,
				subject: '¡Has recibido un nuevo Duelo!',
				text: 'Has recibido un nuevo duelo de ' + parametres.nick,
				html: template.html.replace('{{NICK}}', parametres.nick),
				attachments: template.images
			});
	}
	return Promise.reject();
}
