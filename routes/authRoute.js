const router         = require('express').Router();
const validate       = require('express-validation');
const authRequest    = require('../requests/authRequest');
const authController = require('../controllers/authController');

router.post('/login', validate(authRequest.loginRequest), authController.login);
router.post('/register', validate(authRequest.registerRequest), authController.register);

module.exports = router;
