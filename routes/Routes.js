const express = require('express');
const router  = new express.Router();

router.use('/v1/auth', require('./Auth'));
router.use('/v1/events', require('./Event'));

module.exports = router;
