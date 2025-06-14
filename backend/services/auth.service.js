const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthorSchema = require('../models/authors');
const AuthorNotFoundException = require('../exceptions/authors/authorsNotFoundException');
const InvalidOrMissingPasswordException = require('../exceptions/auth/InvalidOrMissingPasswordException');

const loginAuth = async (email, password) => {
    const author = await AuthorSchema.findOne({ email });
    if (!author) throw new AuthorNotFoundException();

    const isPasswordValid = await bcrypt.compare(password, author.password);
    if (!isPasswordValid) throw new InvalidOrMissingPasswordException();

    const token = jwt.sign(
        {
            id: author._id,
            email: author.email
        },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN });

    return { token };
};

const findMe = async (email) => {
    return AuthorSchema
        .findOne({ email })
        .select('-password');
};

module.exports = {
    loginAuth,
    findMe
};