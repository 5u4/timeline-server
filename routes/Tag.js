const router        = require('express').Router();
const validate      = require('express-validation');
const TagController = require('../app/Http/Controllers/TagController');
const TagValidator  = require('../app/Validators/TagValidator');

const Authenticated = require('../app/Http/Middlewares/Authenticated');

/* version 1 */
router.get('/', Authenticated, TagController.index);
router.post('/', [Authenticated, validate(TagValidator.store)], TagController.store);
router.patch('/:tagId', [Authenticated, validate(TagValidator.update)], TagController.update);
router.delete('/:tagId', [Authenticated, validate(TagValidator.destroy)], TagController.destroy);

module.exports = router;
