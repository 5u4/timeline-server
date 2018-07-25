process.env.NODE_ENV = 'test';

const User  = require('../app/Models/User');
const Event = require('../app/Models/Event');

/**
 * Remove all database records
 */
const removeAllDBRecords = () => {
    User.remove().exec();
    Event.remove().exec();
};

/**
 * Connect to server
 *
 * @returns {*}
 */
const connect = () => {
    return require('../main');
};

/**
 * Disconnect express server
 *
 * @param server
 */
const disconnect = (server) => {
    server.close();
};

/**
 * Disconnect mongoose connection
 */
const disconnectMongoose = () => {
    require('mongoose').connection.close();
};

/**
 * Get chai package using chai-http
 *
 * @returns {*}
 */
const getChai = () => {
    const chai = require('chai');
    chai.use(require('chai-http'));

    return chai;
};

module.exports = {
    removeAllDBRecords,
    connect,
    disconnect,
    disconnectMongoose,
    getChai,
};
