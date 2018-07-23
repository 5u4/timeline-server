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

/**
 * Update an user event
 * 
 * @param {Number} eventId The event id
 * @param {Object} updatedFields The updated fields as an object
 */
const editUserEvent = async function(eventId, updatedFields) {
    await Event.findByIdAndUpdate(eventId, updatedFields);

    return await Event.findById(eventId);
};

module.exports = {
    createUserEvent,
    editUserEvent,
};
