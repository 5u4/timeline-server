const HttpExceptionHandler = require('./HttpExceptionHandler');

/**
 * Handle general exceptions.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const generalHttpExceptionHandler = (err, req, res, next) => {
    if (err instanceof HttpExceptionHandler) {
        err.handle();
        return;
    }

    const exception = new HttpExceptionHandler(res, 500, err);

    exception.handle();
};

module.exports = generalHttpExceptionHandler;
