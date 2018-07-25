const TagService     = require('../Services/TagService');
const User           = require('../../Models/User');
const TagTransformer = require('../Transformers/TagTransformer');

const NotFoundException = require('../../Exceptions/NotFoundHttpExceptionHandler');

/**
 * List all user tags
 *
 * @param req
 * @param res
 * @param next
 *
 * @param {String} req.headers['x-access-token'] The user auth token | required
 *
 * @example success response:
 *
 *     status: 200 OK
 *
 *     [{
 *         id:          {String},
 *         name:        {String},
 *         description: {String},
 *         color:       {Number},
 *     },]
 */
const index = async function(req, res) {
    res.status(200).json(TagTransformer.collection(req.user.tags));
};

/**
 * Create a tag
 *
 * @param req
 * @param res
 * @param next
 *
 * @param {String} req.headers['x-access-token'] The user auth token             | required
 * @param {String} req.body.name                 The name of the tag          | required
 * @param {String} req.body.description          The description of the tag
 * @param {Number} req.body.color                The color of the tag
 *
 * @example success response:
 *     status: 201 CREATED
 *
 *     {
 *         id:          {String},
 *         name:        {String},
 *         description: {String},
 *         color:       {Number},
 *     }
 */
const store = async function(req, res) {
    const tag = await TagService.createUserTag(req.user, req.body.name, req.body.description, req.body.color);

    res.status(201).json(TagTransformer.make(tag));
};

/**
 * Edit a tag
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @param {String} req.headers['x-access-token'] The user auth token             | required
 * @param {String} req.params.tagId              The tag id                    | required
 * @param {String} req.body.name                 The name of the tag
 * @param {String} req.body.description          The description of the tag
 * @param {Number} req.body.color                The color of the tag
 * 
 * @example success response:
 *     status: 200 OK
 *
 *     {
 *         id:          {String},
 *         name:        {String},
 *         description: {String},
 *         color:       {Number},
 *     }
 */
const update = async function(req, res, next) {
    const tag = await TagService.editUserTag(req.user._id, req.params.tagId, req.body);

    if (!tag) {
        return next(new NotFoundException(res, ['The tag does not exist']));
    }

    res.status(200).json(TagTransformer.make(tag));
};

/**
 * Delete an user tag
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @param {String} req.params.tagId The tag id | required
 * 
 * @example success response:
 *     status: 204 NO CONTENT
 */
const destroy = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id,
        tags: {_id: req.params.tagId}
    });

    if (!user) {
        return next(new NotFoundException(res, ['The tag does not exist']));
    }

    await TagService.deleteUserTag(req.user._id, req.params.tagId);

    res.status(204).send();
};

module.exports = {
    index,
    store,
    update,
    destroy,
};
