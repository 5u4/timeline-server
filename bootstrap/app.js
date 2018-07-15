const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');

const generalHttpExceptionHandler = require('../app/Exceptions/GeneralHttpExceptionHandler');

/* create app */
const app = express();

/* use body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* console log api */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

/* append /api to app routes and use the routes */
app.use('/api', require('../routes/Routes'));

/* handle exceptions */
app.use(generalHttpExceptionHandler);

/* connect to database */
require('../database/connection');

module.exports = app;
