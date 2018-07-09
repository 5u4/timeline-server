module.exports = {
    timeline: {
        host    : process.env.TIMELINE_DB_HOST     || 'localhost',
        user    : process.env.TIMELINE_DB_USER     || null,
        password: process.env.TIMELINE_DB_PASSWORD || null,
        port    : process.env.TIMELINE_DB_PORT     || 27017,
        database: process.env.TIMELINE_DB_DATABASE || 'timeline',
    }
};
