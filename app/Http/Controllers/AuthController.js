const BadRequestHttpExceptionHandler = require('../../Exceptions/BadRequestHttpExceptionHandler');

const AuthService = require('../Services/AuthService');
const UserService = require('../Services/UserService');

/**
 * login a user
 *
 * @param req
 * @param res
 * @param next
 *
 * @param req.body.username {String} the unique username | required
 * @param req.body.password {String} the password without been hashed | required
 *
 * @example success response:
 *     status: 200 OK
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
 * Check if a username is already been taken.
 *
 * @param req
 * @param res
 *
 * @param req.body.username {String} the username that needs to be checked | required
 *
 * @example success response:
 *     status: 200 OK
 *
 *     {
 *         isTaken: {Boolean} true if the username is already been taken, else false
 *     }
 */
const checkUsernameUniqueness = (req, res) => {
    UserService.isUsernameBeenTaken(req.body.username).then((isTaken) => {
        res.status(200).json({
            isTaken: isTaken,
        });
    });
};

/**
 * register a user
 *
 * @param req
 * @param res
 * @param next
 *
 * @param req.body.username {String} the unique username | required
 * @param req.body.password {String} the password without been hashed | required
 *
 * @example success response:
 *     status: 201 CREATED
 *
 *     {
 *         user : {Object} the newly created user,
 *         token: {String} the json web token,
 *     }
 */
const register = (req, res, next) => {
    UserService.isUsernameBeenTaken(req.body.username).then((isTaken) => {
        if (isTaken) {
            next(new BadRequestHttpExceptionHandler(res, ['The username is been taken']));
            return;
        }

        UserService.createUser(req.body.username, req.body.password).then((user) => {
            AuthService.getAuthToken(user).then((token) => {
                res.status(201).json({
                    user: user,
                    token: token,
                });
            });
        }, (err) => {
            next(new BadRequestHttpExceptionHandler(res, err));
        });
    });
};

module.exports = {
    login,
    checkUsernameUniqueness,
    register,
};
