const BadRequestHttpExceptionHandler = require('../../Exceptions/BadRequestHttpExceptionHandler');

const EventService = require('../Services/EventService');

/**
 * List all user events
 *
 * @param req
 * @param res
 * @param next
 *
 * @param req.header.x-access-token {String} The user auth token | required
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
 *     },]
 */
const index = (req, res, next) => {
    EventService.getAllUserEvents(req.user).then(events => {
        res.json(events);
    }, err => {
        next(new BadRequestHttpExceptionHandler(res, ['Unable to get user events']));
    });
};

/**
 * Create an event
 *
 * @param req
 * @param res
 * @param next
 *
 * @param req.header.x-access-token {String} The user auth token             | required
 * @param req.body.title            {String} The title of the event          | required
 * @param req.body.description      {String} The description of the event
 * @param req.body.postedAt         {Number} The timestamp of the event date
 *
 * @example success response:
 *     status: 201 CREATED
 *
 *     {
 *         id: {String},
 *         title: {String},
 *         description: {String},
 *         postedAt: {Number},
 *     }
 */
const store = (req, res, next) => {
    EventService.createUserEvent(req.body.title, req.body.description, req.body.postedAt).then(event => {
        console.log(event);
        res.status(201).json(event);
    }, err => {
        console.log(err);
        next(new BadRequestHttpExceptionHandler(res, ['Unable to create event']));
    });
};

module.exports = {
    index,
    store,
};
