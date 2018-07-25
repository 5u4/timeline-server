const faker = require('faker');
const Event = require('../../app/Models/Event');
const User  = require('../../app/Models/User');

/**
 * Build an event
 *
 * @param {String} userId       The user that owns the event
 * @param {String} title        The title of the event
 * @param {String} description  The description, default null
 * @param {Number} postedAt     The postedAt timestamp of the event, default current
 *
 * @returns {Event}
 */
const make = async function(userId, title = null, description = null, postedAt = null) {
    if (!title) {
        title = faker.name.title;
    }

    if (!description) {
        description = faker.lorem.sentence;
    }

    if (!postedAt) {
        postedAt = new Date();
    }

    const event = new Event({
        title: title,
        description: description,
        postedAt: postedAt,
    });

    await User.findByIdAndUpdate(userId, {$push: {events: event._id}});

    return event;
};

/**
 * Build an event and save it to the database
 * 
 * @param {String} userId       The user that owns the event
 * @param {String} title        The title of the event
 * @param {String} description  The description, default null
 * @param {Number} postedAt     The postedAt timestamp of the event, default current
 *
 * @returns {Event}
 */
const create = async function(userId, title = null, description = null, postedAt = null) {
    const event = await make(userId, title, description, postedAt);

    await event.save();

    return event;
};

module.exports = {
    make,
    create,
};
