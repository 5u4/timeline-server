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

    let statusCode = 500;

    if (err.status) {
        statusCode = err.status;
    }

    const exception = new HttpExceptionHandler(res, statusCode, err);

    exception.handle();
};

module.exports = generalHttpExceptionHandler;
