const Tag  = require('../../Models/Tag').model;
const User = require('../../Models/User');

/**
 * Check if the tag belongs to the user
 * 
 * @param {Number} tagId The tag id
 * @param {String} userId  The user id
 * 
 * @returns {Boolean} If the tag belongs to user
 */
const isTagBelongsToUser = async (tagId, userId) => {
    const user = await User.findById(userId);

    return user.tags.map(tag => tag._id).indexOf(tagId) > -1;
};

/**
 * Create an user tag
 *
 * @param {User}   user        The current user
 * @param {String} name        The name of the tag
 * @param {String} description The description of the tag
 * @param {String} color       The color of the tag
 *
 * @returns {Tag} The newly created tag
 */
const createUserTag = async function(user, name, description = null, color = null) {
    const tag = new Tag({
        name: name,
        description: description,
        color: color,
    });

    await User.findByIdAndUpdate(user._id, {$push: {tags: tag}});

    return await tag;
};

/**
 * Update an user tag
 * 
 * @param {String} userId        The user id
 * @param {String} tagId         The tag id
 * @param {Object} updatedFields The updated fields as an object
 * 
 * @returns {Tag} The updated tag
 */
const editUserTag = async function(userId, tagId, updatedFields) {
    const fields = {};

    if (updatedFields.name) {
        fields['tags.$.name'] = updatedFields.name;
    }

    if (updatedFields.description) {
        fields['tags.$.description'] = updatedFields.description;
    }

    if (updatedFields.color) {
        fields['tags.$.color'] = updatedFields.color;
    }

    const user = await User.findOneAndUpdate({
        _id: userId,
        'tags._id': tagId,
    }, {$set: fields});

    if (!user) {
        return undefined;
    }

    return (await User.findById(userId)).tags.find(tag => tag._id == tagId);
};

/**
 * Delete an user tag
 * 
 * @param {String} userId The user id
 * @param {String} tagId  The tag id that is going to be deleted
 */
const deleteUserTag = async (userId, tagId) => {
    await User.findByIdAndUpdate(userId, {$pull: {tags: {_id: tagId}}});
};

module.exports = {
    isTagBelongsToUser,
    createUserTag,
    editUserTag,
    deleteUserTag,
};
