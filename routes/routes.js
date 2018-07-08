const express = require('express');
const bodyParser = require('body-parser');

const router = new express.Router();

/* body parser middleware */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* other routes */
router.use(require('./authRoute'));

module.exports = router;
