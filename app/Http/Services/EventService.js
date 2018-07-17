const Event = require('../../Models/Event');

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
const createUserEvent = (title, description = null, postedAt = null) => {
    return new Promise((resolve, reject) => {
        const data = {
            title: title,
        };

        if (description) {
            data.description = description;
        }

        if (postedAt) {
            data.postedAt = postedAt;
        }

        const event = new Event(data);

        event.save(err => {
            reject(err);
        });

        resolve(event);
    });
};

module.exports = {
    getUserEvent,
    getAllUserEvents,
    createUserEvent,
};
