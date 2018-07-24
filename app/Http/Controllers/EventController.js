const EventService = require('../Services/EventService');
const Event        = require('../../Models/Event');

const EventTransformer = require('../Transformers/EventTransformer');

const NotFoundException            = require('../../Exceptions/NotFoundHttpExceptionHandler');
const InternalServerErrorException = require('../../Exceptions/InternalServerErrorHttpExceptionHandler');

/**
 * List all user events
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
 *         title:       {String},
 *         description: {String},
 *         postedAt:    {Number},
 *         createdAt:   {Number},
 *         updatedAt:   {Number},
 *     },]
 */
const index = async function(req, res) {
    const events = await Event.find({'_id': {$in: req.user.events}});

    res.json(EventTransformer.collection(events));
};

/**
 * Create an event
 *
 * @param req
 * @param res
 * @param next
 *
 * @param {String} req.headers['x-access-token']  The user auth token             | required
 * @param {String} req.body.title                 The title of the event          | required
 * @param {String} req.body.description           The description of the event
 * @param {Number} req.body.postedAt              The timestamp of the event date
 *
 * @example success response:
 *     status: 201 CREATED
 *
 *     {
 *         id:          {String},
 *         title:       {String},
 *         description: {String},
 *         postedAt:    {Number},
 *         createdAt:   {Number},
 *         updatedAt:   {Number},
 *     }
 */
const store = async function(req, res) {
    const event = await EventService.createUserEvent(req.user, req.body.title, req.body.description, req.body.postedAt);

    res.status(201).json(EventTransformer.make(event));
};

/**
 * Edit an event
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @param {String} req.headers['x-access-token']  The user auth token             | required
 * @param {String} req.params.eventId             The event id                    | required
 * @param {String} req.body.title                 The title of the event
 * @param {String} req.body.description           The description of the event
 * @param {Number} req.body.postedAt              The timestamp of the event date
 * 
 * @example success response:
 *     status: 200 OK
 *
 *     {
 *         id:          {String},
 *         title:       {String},
 *         description: {String},
 *         postedAt:    {Number},
 *         createdAt:   {Number},
 *         updatedAt:   {Number},
 *     }
 */
const update = async function(req, res, next) {
    if (!await Event.findById(req.params.eventId) || !await EventService.isEventBelongsToUser(req.params.eventId, req.user._id)) {
        return next(new NotFoundException(res, ['The event does not exist']));
    }

    const event = await EventService.editUserEvent(req.params.eventId, req.body);

    res.status(200).json(EventTransformer.make(event));
};

/**
 * Delete an user event
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @param {String} req.params.eventId The event id | required
 * 
 * @example success response:
 *     status: 204 NO CONTENT
 */
const destroy = async (req, res, next) => {
    if (!await Event.findById(req.params.eventId) || !await EventService.isEventBelongsToUser(req.params.eventId, req.user._id)) {
        return next(new NotFoundException(res, ['The event does not exist']));
    }

    const isDeleted = await EventService.deleteUserEvent(req.user._id, req.params.eventId);

    if (!isDeleted) {
        return next(new InternalServerErrorException(res));
    }

    res.status(204).send();
};

module.exports = {
    index,
    store,
    update,
    destroy,
};
