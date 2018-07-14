class HttpExceptionHandler
{
    /**
     * Construct a http exception handler
     *
     * @param res
     * @param statusCode {number} the exception status code
     * @param messages   {Array} the error messages
     */
    constructor(res, statusCode, messages = []) {
        this.res        = res;
        this.messages   = messages;
        this.statusCode = statusCode;
    }

    /**
     * Handle the exception
     */
    handle() {
        this.res.status(this.statusCode).json(this.getDataBody());
    };

    /**
     * Build the response data body.
     */
    getDataBody() {
        const data = {};

        if (this.messages.length !== 0) {
            data.messages = this.messages;
        }

        return data;
    };

    /**
     * Set the messages to the given array.
     * Note: use appendMessages instead of set messages to prevent overwrite messages
     *
     * @param messages {Array}
     */
    setMessages(messages) {
        this.messages = messages;
    };

    /**
     * Append a new message to the response body messages.
     *
     * @param message {String}
     */
    appendMessages(message) {
        this.messages.push(message);
    }
}

module.exports = HttpExceptionHandler;
