const router = require('express').Router();
const authController = require('../controllers/authController');

const resourceIdentifier = '/auth';

router.get(resourceIdentifier + '/login', authController.login);

module.exports = router;
