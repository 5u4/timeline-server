const express          = require('express');
const bodyParser       = require('body-parser');
const exceptionHandler = require('../exceptions/exceptionHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('../routes/routes'));

/* validation error handling */
app.use(exceptionHandler.requestValidationErrorHandler);

module.exports = app;
