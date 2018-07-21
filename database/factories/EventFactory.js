const faker  = require('faker');
const Event  = require('../../app/Models/Event');

/**
 * Build an event
 *
 * @param {User}   user         The user that owns the event
 * @param {String} title        The title of the event
 * @param {String} description  The description, default null
 * @param {Number} postedAt     The postedAt timestamp of the event, default current
 *
 * @returns {Event}
 */
const make = async function(user, title = null, description = null, postedAt = null) {
    if (!title) {
        title = faker.name.title;
    }

    if (!postedAt) {
        postedAt = new Date();
    }

    const event = new Event({
        title: title,
        description: description,
        postedAt: postedAt,
    });

    user.events.push(event._id);

    await user.save();

    return event;
};

/**
 * Build an event and save it to the database
 * 
 * @param {User}   user         The user that owns the event
 * @param {String} title        The title of the event
 * @param {String} description  The description, default null
 * @param {Number} postedAt     The postedAt timestamp of the event, default current
 *
 * @returns {Event}
 */
const create = async function(user, title = null, description = null, postedAt = null) {
    if (!title) {
        title = faker.name.title;
    }

    if (!postedAt) {
        postedAt = new Date();
    }

    const event = await make(user, title, description, postedAt);

    await event.save();

    return event;
};

module.exports = {
    make,
    create,
};
