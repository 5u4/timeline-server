const mongojs = require('mongojs');
const dbConfig = require('../configs/database');

// TODO: update the connection string for more cases

const connectionString = dbConfig.timeline.host === 'localhost'
    ? dbConfig.timeline.host + ':' + dbConfig.timeline.port + '/' + dbConfig.timeline.database
    : 'mongodb://' + dbConfig.timeline.user + ':' + dbConfig.timeline.password + '@'
        + dbConfig.timeline.host + ':' + dbConfig.timeline.port + '/' + dbConfig.timeline.database;

const collections = [
    'users',
];

const db = mongojs(connectionString, collections);

module.exports = db;
