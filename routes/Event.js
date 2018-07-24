const router          = require('express').Router();
const validate        = require('express-validation');
const EventController = require('../app/Http/Controllers/EventController');
const EventValidator  = require('../app/Validators/EventValidator');

const Authenticated = require('../app/Http/Middlewares/Authenticated');

/* version 1 */
router.get('/', Authenticated, EventController.index);
router.post('/', [Authenticated, validate(EventValidator.store)], EventController.store);
router.patch('/:eventId', [Authenticated, validate(EventValidator.update)], EventController.update);

module.exports = router;
