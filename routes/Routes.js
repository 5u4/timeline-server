const express = require('express');
const router  = new express.Router();

router.use('/auth', require('./Auth'));

module.exports = router;
