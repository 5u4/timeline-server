const HttpExceptionHandler = require('./HttpExceptionHandler');

class BadRequestHttpExceptionHandler extends HttpExceptionHandler
{
    constructor(res, messages = []) {
        super(res, 400, messages);
    }
}

module.exports = BadRequestHttpExceptionHandler;
