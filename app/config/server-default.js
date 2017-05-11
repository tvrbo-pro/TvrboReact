module.exports = {
    DEBUG: true,

    APP_NAME: 'Tvrbo React',
    HTML_TITLE: 'Tvrbo React',
    DOMAIN: 'your-domain.com',  // without 'www'
    SERVER_URL: 'https://github.com/TvrboPro/TvrboReact',

		// MAILING
    EMAIL_FROM: 'no-reply@your-domain.com',
    SMTP_HOST: 'localhost',
    SMTP_PORT: 25,
    DEBUG_NOTIFICATIONS_EMAIL: 'Test User <test@tvrbo.pro>',
    BACKEND_PREFIX: 'https://admin.your-domain.com',

    // SEO
    KEYWORDS: 'Tvrbo React',
    DESCRIPTION: 'Tvrbo React Description',
    SOCIAL_IMAGE: 'https://github.com/TvrboPro/TvrboReact/media/social.jpg',
    SOCIAL_URL_PUBLISHER: 'https://github.com/TvrboPro/TvrboReact',
    SOCIAL_URL: 'https://github.com/TvrboPro/TvrboReact',

    HTTP_PORT: process.env.NODE_ENV != 'production' ? 3000 : 8080,
		SESSION_MAX_AGE: 1000 * 60 * 60 * 24 * 7, // 1 week
    CACHE_MAX_AGE: 1000 * 60 * 60 * 24 * 3, // 3 days
    ALLOW_CORS: false,

    GOOGLE_ANALYTICS_CODE: '',

		JWT_SECRET: 'KEY_HERE',

    // DISABLE DATABASE
    MONGODB_URI: '',
    MONGODB_TEST_URI: '',

		// ENABLE DATABASE
    // MONGODB_URI: 'mongodb://localhost:27017/test',
    // MONGODB_TEST_URI: 'mongodb://localhost:27017/test_test',

    // RESTRICT ACCESS
    HTTP_USER: '',
    HTTP_PASSWORD: ''
};
