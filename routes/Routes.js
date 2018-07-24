const express = require('express');
const router  = new express.Router();

router.use('/v1/auth', require('./Auth'));
router.use('/v1/events', require('./Event'));
router.use('/v1/tags', require('./Tag'));

module.exports = router;
