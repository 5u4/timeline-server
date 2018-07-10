const AuthService = require('../Services/AuthService');
const UserService = require('../Services/UserService');

/**
 * login a user
 *
 * @param req
 * @param res
 *
 * @param req.body.username {String} the unique username | required
 * @param req.body.password {String} the password without been hashed | required
 *
 * @example success response: {
 *     success: {Boolean} if login success,
 *     token  : {String}  the json web token,
 * }
 *
 * @example error response: {
 *     success: {Boolean} if login success,
 *     errors : {String}  the error occurred during login,
 * }
 */
const login = (req, res) => {
    AuthService.credentialCheck(req.body.username, req.body.password).then((payload) => {
        AuthService.getAuthToken(payload.user).then((token) => {
            res.json({
                success: true,
                token: token,
            })
        });
    }, (err) => {
        res.json({success: false, errors: err});
    });
};

/**
 * register a user
 *
 * @param req
 * @param res
 *
 * @param req.body.username {String} the unique username | required
 * @param req.body.password {String} the password without been hashed | required
 *
 * @example success response: {
 *     user : {Object} the newly created user,
 *     token: {String} the json web token,
 * }
 *
 * @example error response: {
 *     errors: {String} the error occurred during register,
 * }
 */
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
