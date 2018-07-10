const mongoose = require('mongoose');
const dbConfig = require('../configs/database');

// TODO: update the connection string for more cases

const connectionString = dbConfig.timeline.host === 'localhost'
    ? 'mongodb://' + dbConfig.timeline.host + ':' + dbConfig.timeline.port + '/' + dbConfig.timeline.database
    : 'mongodb://' + dbConfig.timeline.user + ':' + dbConfig.timeline.password + '@'
        + dbConfig.timeline.host + ':' + dbConfig.timeline.port + '/' + dbConfig.timeline.database;

mongoose.connect(connectionString, {useNewUrlParser: true});

module.exports = mongoose;
