require('dotenv').config();

const app = require('./bootstrap/app');

const appConfig = require('./configs/app');

const port = (process.env.NODE_ENV === 'test')
    ? appConfig.testing.port || appConfig.express.port
    : appConfig.express.port;

module.exports = app.listen(port);
