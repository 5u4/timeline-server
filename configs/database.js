const env = process.env;

module.exports = {
    timeline: {
        connection: env.MONGODB_URI || 'mongodb://localhost:27017/timeline'
    },

    testing: {
        connection: env.MONGODB_TEST_URI || 'mongodb://localhost:27017/timeline_test'
    },
};
