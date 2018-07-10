const express          = require('express');
const bodyParser       = require('body-parser');
const ExceptionHandler = require('../app/Exceptions/Handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('../routes/Routes'));

/* error handling */
app.use(ExceptionHandler.handle);

module.exports = app;
