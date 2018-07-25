const env = process.env;

module.exports = {
    express: {
        port: env.PORT || env.APP_PORT || 3000,
    },

    testing: {
        port: env.APP_TEST_PORT || 8080,
    },
};
