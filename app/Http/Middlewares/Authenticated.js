const jwt = require('jsonwebtoken');
const jwtConfig = require('../../../configs/jwt');

const UnauthorizedHttpExceptionHandler = require('../../Exceptions/UnauthorizedHttpExceptionHandler');

/**
 * Check if a jwt is been provided with the request
 *
 * If not, response unauthorized, else set req.user to current user
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        next(new UnauthorizedHttpExceptionHandler(res, ['Token not found']));
        return;
    }

    jwt.verify(token, jwtConfig.jwtsecret, (err, decoded) => {
        if (err) {
            next(new UnauthorizedHttpExceptionHandler(res, ['Invalid token']));
            return;
        }

        req.user = decoded;
        next();
    });
};
