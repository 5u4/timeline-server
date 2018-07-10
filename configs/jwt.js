module.exports = {
    jwtsecret: process.env.APP_KEY || null,
    expiresIn: 60 * 60 * 24,
};
