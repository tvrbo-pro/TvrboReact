///////////////////////////////////////////////////////////////////////////////
// ENVIRONMENT
///////////////////////////////////////////////////////////////////////////////

// Variables that may be fetched from the system
const envWhitelist = ["DEBUG", "HTTP_PORT", "JWT_SECRET"]; // ["API_KEY", "API_SECRET", ...]

///////////////////////////////////////////////////////////////////////////////
// GENERIC
///////////////////////////////////////////////////////////////////////////////

var config = {
	DEBUG: true,

	APP_NAME: "Tvrbo React",
	HTML_TITLE: "Tvrbo React",
	DOMAIN: "your-domain.com", // without 'www'
	SERVER_URL: "https://github.com/ledfusion/TvrboReact",

	// MAILING
	EMAIL_FROM: "no-reply@your-domain.com",
	SMTP_HOST: "localhost",
	SMTP_PORT: 25,
	DEBUG_NOTIFICATIONS_EMAIL: "Test User <test@tvrbo.pro>",
	BACKEND_PREFIX: "https://admin.your-domain.com",

	// SEO
	KEYWORDS: "Tvrbo React",
	DESCRIPTION: "Tvrbo React Description",
	SOCIAL_IMAGE: "https://github.com/ledfusion/TvrboReact/media/social.jpg",
	SOCIAL_URL_PUBLISHER: "https://github.com/ledfusion/TvrboReact",
	SOCIAL_URL: "https://github.com/ledfusion/TvrboReact",

	HTTP_PORT: process.env.NODE_ENV != "production" ? 3000 : 8080,
	SESSION_MAX_AGE: 1000 * 60 * 60 * 24 * 7, // 1 week
	CACHE_MAX_AGE: 1000 * 60 * 60 * 24 * 3, // 3 days
	ALLOW_CORS: false,

	JWT_SECRET: "KEY_HERE",

	// DISABLE DATABASE
	// MONGODB_URI: '',
	// MONGODB_TEST_URI: '',

	// ENABLE DATABASE
	MONGODB_URI: "mongodb://localhost:27017/tvrbo_react",
	MONGODB_TEST_URI: "mongodb://localhost:27017/tvrbo_react_test",

	// RESTRICT ACCESS
	HTTP_USER: "",
	HTTP_PASSWORD: ""
};

///////////////////////////////////////////////////////////////////////////////
// CUSTOM
///////////////////////////////////////////////////////////////////////////////

// config.APP_NAME = '';

///////////////////////////////////////////////////////////////////////////////
// PRODUCTION
///////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV == "production") {
	config.DEBUG = false;
	config.HTTP_PORT = 10100;
}

///////////////////////////////////////////////////////////////////////////////
// ENVIRONMENT OVERRIDE
///////////////////////////////////////////////////////////////////////////////

for (let key of envWhitelist) {
	if (typeof process.env[key] == "undefined") continue;

	console.log(`Using environment variable "${key}" [whitelisted]`);
	config[key] = process.env[key];
}

///////////////////////////////////////////////////////////////////////////////
// DONE
///////////////////////////////////////////////////////////////////////////////

module.exports = config;
