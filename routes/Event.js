const router         = require('express').Router();
const validate       = require('express-validation');
const EventController = require('../app/Http/Controllers/EventController');

const Authenticated = require('../app/Http/Middlewares/Authenticated');

/* version 1 */
router.get('/', Authenticated, EventController.index);
router.post('/', Authenticated, EventController.store);

module.exports = router;
