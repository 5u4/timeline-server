/**
 * handle exceptions.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const handle = (err, req, res, next) => {
    res.status(400).json(err);
};

module.exports = {
    handle,
};

// TODO: add more exception handlers for other cases
