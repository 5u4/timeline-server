const AuthService = require('../Services/AuthService');
const UserService = require('../Services/UserService');

const login = (req, res) => {
    AuthService.credentialCheck(req.body.username, req.body.password).then((payload) => {
        if (payload.success) {
            AuthService.getAuthToken(payload.user).then((token) => {
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
    UserService.createUser(req.body.username, req.body.password).then((user) => {
        AuthService.getAuthToken(user).then((token) => {
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
