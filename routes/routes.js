const express = require('express');
const router  = new express.Router();

router.use('/auth', require('./authRoute'));

module.exports = router;
