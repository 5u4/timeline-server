const mongojs = require('mongojs');

// TODO: update the connection string for more cases

const connectionString = process.env.TIMELINE_DB_HOST == 'localhost'
    ? process.env.TIMELINE_DB_HOST + ':' + process.env.TIMELINE_DB_PORT + '/' + process.env.TIMELINE_DB_DATABASE
    : 'mongodb://' + process.env.TIMELINE_DB_USER + ':' + process.env.TIMELINE_DB_PASSWORD + '@'
        + process.env.TIMELINE_DB_HOST + ':' + process.env.TIMELINE_DB_PORT + '/' + process.env.TIMELINE_DB_DATABASE;

const collections = [
    'users',
];

const db = mongojs(connectionString, collections);

module.exports = db;
