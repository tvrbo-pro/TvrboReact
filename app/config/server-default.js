module.exports = {

    // GENERIC
    DEBUG: true,

    APP_NAME: 'Tvrbo React',
    HTML_TITLE: 'Tvrbo React',
    DOMAIN: 'your-domain.com',  // without 'www'
    SERVER_URL: 'https://github.com/TvrboPro/TvrboReact',

		// MAILING
    EMAIL_FROM: 'no-reply@your-domain.com',
    // EMAIL_SERVER: 'smtp.gmail.com',
    // EMAIL_USER: 'no-reply@domain.com',
    // EMAIL_PASSWORD: 'xxx',
    DEBUG_NOTIFICATIONS_EMAIL: 'Test User <test@tvrbo.pro>',
    BACKEND_PREFIX: 'https://admin.your-domain.com',

    // SEO
    KEYWORDS: 'Tvrbo React',
    DESCRIPTION: 'Tvrbo React ©',
    SOCIAL_IMAGE: 'https://github.com/TvrboPro/TvrboReact/media/social.jpg',
    SOCIAL_URL_PUBLISHER: 'https://github.com/TvrboPro/TvrboReact',
    SOCIAL_URL: 'https://github.com/TvrboPro/TvrboReact',

    HTTP_PORT: process.env.NODE_ENV != 'production' ? 3000 : 8080,
    ALLOW_CORS: false,
    CACHE_MAX_AGE: 1000 * 60 * 60 * 24 * 3, // 3 days

    GOOGLE_ANALYTICS_CODE: '',

		JWT_SECRET: 'KEY_HERE',

    // DATABASE
    // MONGODB_URI: '', // Leave blank if not used
    MONGODB_URI: 'mongodb://localhost:27017/test',
    MONGODB_TEST_URI: 'mongodb://localhost:27017/test_test',

    // RESTRICT ACCESS
    HTTP_USER: '',
    HTTP_PASSWORD: ''
};
