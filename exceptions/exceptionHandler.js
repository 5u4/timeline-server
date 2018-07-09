const requestValidationErrorHandler = (err, req, res, next) => {
    res.status(400).json(err);
};

module.exports = {
    requestValidationErrorHandler,
};

// TODO: add more exception handlers for other cases
