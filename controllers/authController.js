const authService = require('../services/authService');
const userService = require('../services/userService');

const login = (req, res) => {
    authService.credentialCheck(req.body.username, req.body.password).then((payload) => {
        if (payload.success) {
            authService.getAuthToken(payload.user).then((token) => {
                res.json({
                    success: true,
                    token: token,
                })
            });
        } else {
            res.json({success: false});
        }
    }, (err) => {
        res.json({success: false, errors: err});
    });
};

const register = (req, res) => {
    userService.createUser(req.body.username, req.body.password).then((user) => {
        authService.getAuthToken(user).then((token) => {
            res.json({
                user: user,
                token: token,
            });
        });
    }, (err) => {
        res.json({errors: err});
    });
};

module.exports = {
    login,
    register,
};
