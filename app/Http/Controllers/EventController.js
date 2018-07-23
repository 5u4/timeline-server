const EventService = require('../Services/EventService');
const Event        = require('../../Models/Event');

const EventTransformer = require('../Transformers/EventTransformer');

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

const update = async function(req, res) {
    const event = await EventService.editUserEvent(req.params.eventId, req.body);

    res.status(200).json(EventTransformer.make(event));
};

module.exports = {
    index,
    store,
    update,
};
