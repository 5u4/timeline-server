const HttpExceptionHandler = require('./HttpExceptionHandler');

class UnauthorizedHttpExceptionHandler extends HttpExceptionHandler
{
    constructor(res, messages = []) {
        super(res, 401, messages);
    }
}

module.exports = UnauthorizedHttpExceptionHandler;
