const BadRequestHttpExceptionHandler = require('../../Exceptions/BadRequestHttpExceptionHandler');

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
 * @example success response:
 *     code: 200 OK
 *
 *     {
 *         token: {String} the json web token,
 *     }
 */
const login = (req, res, next) => {
    AuthService.credentialCheck(req.body.username, req.body.password).then((payload) => {
        if (!payload.success) {
            next(new BadRequestHttpExceptionHandler(res, ['Username and password not match']));
            return;
        }

        AuthService.getAuthToken(payload.user).then((token) => {
            res.json({
                success: true,
                token: token,
            })
        });
    }, (err) => {
        next(new BadRequestHttpExceptionHandler(res, err));
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
 * @example success response:
 *     code: 200 OK
 *
 *     {
 *         user : {Object} the newly created user,
 *         token: {String} the json web token,
 *     }
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
        next(new BadRequestHttpExceptionHandler(res, err));
    });
};

module.exports = {
    login,
    register,
};
