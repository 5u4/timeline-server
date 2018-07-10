const express = require('express');
const router  = new express.Router();

router.use('/v1/auth', require('./Auth'));

module.exports = router;
