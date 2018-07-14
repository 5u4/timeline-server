const router         = require('express').Router();
const validate       = require('express-validation');
const AuthValidator  = require('../app/Validators/AuthValidator');
const AuthController = require('../app/Http/Controllers/AuthController');

/* version 1 */
router.post('/login', validate(AuthValidator.login), AuthController.login);
router.post('/uniqueness/username', validate(AuthValidator.usernameUniquenessCheck), AuthController.checkUsernameUniqueness);
router.post('/register', validate(AuthValidator.register), AuthController.register);

module.exports = router;
