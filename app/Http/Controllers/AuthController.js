const BadRequestHttpExceptionHandler = require('../../Exceptions/BadRequestHttpExceptionHandler');

const AuthService = require('../Services/AuthService');
const UserService = require('../Services/UserService');
const User        = require('../../Models/User');

const UserTransformer = require('../Transformers/UserTransformer');

/**
 * login a user
 *
 * @param req
 * @param res
 * @param next
 *
 * @param {String} req.body.username The unique username              | required
 * @param {String} req.body.password The password without been hashed | required
 *
 * @example success response:
 *     status: 200 OK
 *
 *     {
 *         token: {String} The json web token,
 *         user: {User} The logged in user,
 *     }
 */
const login = async function(req, res, next) {
    if (!await AuthService.isCorrectCredential(req.body.username, req.body.password)) {
        next(new BadRequestHttpExceptionHandler(res, ['Username and password not match']));
        return;
    }

    const user = await User.findOne({username: req.body.username});

    res.json({
        token: await AuthService.getAuthToken(user._id),
        user: UserTransformer.make(user),
    });
};

/**
 * Check if a username is already been taken.
 *
 * @param req
 * @param res
 *
 * @param {String} req.body.username The username that needs to be checked | required
 *
 * @example success response:
 *     status: 200 OK
 *
 *     {
 *         isTaken: {Boolean} True if the username is already been taken, else false
 *     }
 */
const checkUsernameUniqueness = async function(req, res) {
    res.json({
        isTaken: await UserService.isUsernameBeenTaken(req.body.username),
    })
};

/**
 * Register a user
 *
 * @param req
 * @param res
 * @param next
 *
 * @param {String} req.body.username The unique username              | required
 * @param {String} req.body.password The password without been hashed | required
 *
 * @example success response:
 *     status: 201 CREATED
 *
 *     {
 *         user : {Object} the newly created user,
 *         token: {String} the json web token,
 *     }
 */
const register = async function(req, res, next) {
    if (await UserService.isUsernameBeenTaken(req.body.username)) {
        next(new BadRequestHttpExceptionHandler(res, ['The username is been taken']));
        return;
    }

    const user = await UserService.createUser(req.body.username, req.body.password);

    const token = await AuthService.getAuthToken(user._id);

    res.status(201).json({
        user: UserTransformer.make(user),
        token: token,
    });
};

module.exports = {
    login,
    checkUsernameUniqueness,
    register,
};
