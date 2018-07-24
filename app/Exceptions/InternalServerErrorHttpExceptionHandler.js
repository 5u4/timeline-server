const HttpExceptionHandler = require('./HttpExceptionHandler');

class InternalServerErrorHttpExceptionHandler extends HttpExceptionHandler
{
    constructor(res, messages = []) {
        super(res, 500, messages);
    }
}

module.exports = InternalServerErrorHttpExceptionHandler;
