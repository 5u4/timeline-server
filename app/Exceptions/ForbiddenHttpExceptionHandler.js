const HttpExceptionHandler = require('./HttpExceptionHandler');

class ForbiddenHttpExceptionHandler extends HttpExceptionHandler
{
    constructor(res, messages = []) {
        super(res, 403, messages);
    }
}

module.exports = ForbiddenHttpExceptionHandler;
