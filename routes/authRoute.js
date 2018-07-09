const router = require('express').Router();
const validate = require('express-validation');
const authRequest = require('../requests/authRequest');
const authController = require('../controllers/authController');

const resourceIdentifier = '/auth';

router.post(resourceIdentifier + '/login', validate(authRequest.loginRequest), authController.login);
router.post(resourceIdentifier + '/register', validate(authRequest.registerRequest), authController.register);

module.exports = router;
