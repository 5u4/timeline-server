const express                     = require('express');
const bodyParser                  = require('body-parser');
const generalHttpExceptionHandler = require('../app/Exceptions/GeneralHttpExceptionHandler');

/* create app */
const app = express();

/* use body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* append /api to app routes and use the routes */
app.use('/api', require('../routes/Routes'));

/* handle exceptions */
app.use(generalHttpExceptionHandler);

module.exports = app;
