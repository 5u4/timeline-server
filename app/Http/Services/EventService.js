const Event = require('../../Models/Event');
const User  = require('../../Models/User');

/**
 * Check if the event belong to the user
 * 
 * @param {Number} eventId The event id
 * @param {String} userId  The user id
 * 
 * @returns {Boolean} If the event belongs to user
 */
const isEventBelongsToUser = async (eventId, userId) => {
    const user = await User.findById(userId);

    return user.events.indexOf(eventId) > -1;
};

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
 * 
 * @returns {Event} The updated event
 */
const editUserEvent = async function(eventId, updatedFields) {
    const fields = {};

    if (updatedFields.title) {
        fields.title = updatedFields.title;
    }

    if (updatedFields.description) {
        fields.description = updatedFields.description;
    }

    if (updatedFields.postedAt) {
        fields.postedAt = updatedFields.postedAt;
    }

    fields.updatedAt = new Date();

    await Event.findByIdAndUpdate(eventId, fields);

    return await Event.findById(eventId);
};

/**
 * Delete an user event
 * 
 * @param {String} userId  The user id
 * @param {String} eventId The event id that is going to be deleted
 * 
 * @returns {Boolean} If the event is been deleted
 */
const deleteUserEvent = async (userId, eventId) => {
    if (!await Event.findByIdAndRemove(eventId)) {
        return false;
    }

    const eventObjectId = require('mongoose').mongo.ObjectId(eventId);

    return !!await User.findByIdAndUpdate(userId, {$pull: {events: eventObjectId}});
};

module.exports = {
    isEventBelongsToUser,
    createUserEvent,
    editUserEvent,
    deleteUserEvent,
};
