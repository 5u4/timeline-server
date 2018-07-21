process.env.NODE_ENV = 'test';

const User  = require('../app/Models/User');
const Event = require('../app/Models/Event');

/**
 * Remove all database records
 *
 * @param done
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
 * Disconnect express server and mongodb connection
 *
 * @param server
 */
const disconnect = (server) => {
    server.close();
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
    getChai,
};
