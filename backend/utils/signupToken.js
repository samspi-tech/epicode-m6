require('dotenv').config();
const jsonWebToken = require("jsonwebtoken");

const signupToken = id => {
    return jsonWebToken.sign(
        { id }, process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN }
    );
};

module.exports = signupToken;