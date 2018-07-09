const express = require('express');
const bodyParser = require('body-parser');
const exceptionHandler = require('../exceptions/exceptionHandler');

const router = new express.Router();

/* body parser middleware */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* other routes */
router.use(require('./authRoute'));

/* validation error handling */
router.use(exceptionHandler.requestValidationErrorHandler);

module.exports = router;
