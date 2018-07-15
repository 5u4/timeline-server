const mongoose = require('mongoose');
const dbConfig = require('../configs/database');

// TODO: update the connection string for more cases

const config = (process.env.NODE_ENV === 'test')
    ? dbConfig.testing
    : dbConfig.timeline;

const host     = config.host;
const port     = config.port;
const database = config.database;
const user     = config.user;
const password = config.password;

/* set connection string */
const connectionString = (host === 'localhost')
    ? 'mongodb://' + host + ':' + port + '/' + database
    : 'mongodb://' + user + ':' + password + '@'
    + host + ':' + port + '/' + database;

/* connect to mongodb */
mongoose.connect(connectionString, {useNewUrlParser: true});

module.exports = mongoose;
