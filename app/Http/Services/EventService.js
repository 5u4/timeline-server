const Event = require('../../Models/Event');
const User  = require('../../Models/User');

/**
 * Get a user event by the event id
 *
 * @param eventId {String} The event id
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Object} The event
 *
 * @example reject {String} The error
 */
const getUserEvent = (eventId) => {
    return new Promise((resolve, reject) => {
        Event.findById(eventId, (err, event) => {
            if (err) {
                reject(err);
            }

            resolve(event);
        });
    });
};

/**
 * Get all events of an user
 *
 * @param user {User} The user
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Array} An array of user events
 *
 * @example reject {String} The error
 */
const getAllUserEvents = (user) => {
    return new Promise((resolve, reject) => {
        Event.find({
            '_id': {$in: user.events},
        }, (err, events) => {
            if (err) {
                reject(err);
            }

            resolve(events);
        });
    });
};

/**
 * Create an user event
 *
 * @param currentUser {User}   The current user
 * @param title       {String} The title of the event
 * @param description {String} The description of the event
 * @param postedAt    {Number} The event date timestamp
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Event} The created event
 *
 * @example reject {String} The error
 */
const createUserEvent = (currentUser, title, description = null, postedAt = null) => {
    return new Promise((resolve, reject) => {
        const event = new Event({
            title: title,
            description: description,
            postedAt: postedAt,
        });

        event.save(err => {
            if (err) {
                console.log(err);
                reject(err);
            }
        });

        User.update({
            _id: currentUser._id,
        }, {
            $push: {events: event._id},
        }, err => {
            if (err) {
                reject(err);
            }
        });

        resolve(event);
    });
};

module.exports = {
    getUserEvent,
    getAllUserEvents,
    createUserEvent,
};
