const authService = require('../services/authService');
const userService = require('../services/userService');

const login = (req, res) => {
    authService.credentialCheck(req.body.username, req.body.password).then((success) => {
        res.json({success: success});
    }, (err) => {
        res.json({success: false, errors: err});
    });
};

const register = (req, res) => {
    userService.createUser(req.body.username, req.body.password).then((user) => {
        res.json({user: user});
    }, (err) => {
        res.json({errors: err});
    });
};

module.exports = {
    login,
    register,
};
