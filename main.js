require('dotenv').config();

const isTestingEnv = process.env.NODE_ENV === 'test';

const app = require('./bootstrap/app');

const port = isTestingEnv
    ? require('./configs/app').testing.port
    : require('./configs/app').express.port;

module.exports = app.listen(port);
