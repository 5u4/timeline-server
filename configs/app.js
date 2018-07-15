module.exports = {
    express: {
        port: process.env.APP_PORT || 3000,
    },

    testing: {
        port: process.env.APP_TEST_PORT || 8080,
    },
};
