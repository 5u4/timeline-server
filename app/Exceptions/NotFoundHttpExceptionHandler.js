const HttpExceptionHandler = require('./HttpExceptionHandler');

class NotFoundHttpExceptionHandler extends HttpExceptionHandler
{
    constructor(res, messages = []) {
        super(res, 404, messages);
    }
}

module.exports = NotFoundHttpExceptionHandler;
