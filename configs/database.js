const env = process.env;

module.exports = {
    timeline: {
        host    : env.TIMELINE_DB_HOST     || 'localhost',
        user    : env.TIMELINE_DB_USER     || null,
        password: env.TIMELINE_DB_PASSWORD || null,
        port    : env.TIMELINE_DB_PORT     || 27017,
        database: env.TIMELINE_DB_DATABASE || 'timeline',
    },

    testing: {
        host    : env.TEST_DB_HOST     || 'localhost',
        user    : env.TEST_DB_USER     || null,
        password: env.TEST_DB_PASSWORD || null,
        port    : env.TEST_DB_PORT     || 27017,
        database: env.TEST_DB_DATABASE || 'timeline_testing',
    },
};
