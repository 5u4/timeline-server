const Event = require('../../Models/Event');
const User  = require('../../Models/User');

/**
 * Create an user event
 *
 * @param {User}   user        The current user
 * @param {String} title       The title of the event
 * @param {String} description The description of the event
 * @param {Number} postedAt    The event date timestamp
 *
 * @returns {Event} The newly created event
 */
const createUserEvent = async function(user, title, description = null, postedAt = null) {
    const event = new Event({
        title: title,
        description: description,
        postedAt: postedAt,
    });

    event.save();

    await User.update({
        _id: user._id,
    }, {
        $push: {events: event._id},
    });

    return await event;
};

module.exports = {
    createUserEvent,
};
