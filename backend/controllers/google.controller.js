const jwt = require('jsonwebtoken');
const authorService = require('../services/author.service');

const manageOauthCallback = async (req, res, next) => {
    try {
        const { user } = req;

        const token = jwt.sign(
            user,
            process.env.JSON_WEB_TOKEN_SECRET,
            { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN });

        const userEmail = user.emails[0].value;
        const isRegisteredUser = await authorService.findSingleAuthorByEmail(userEmail);

        const redirectUrl = isRegisteredUser
            ? `${process.env.CLIENT_BASE_URL}/success/user?token=${encodeURIComponent(token)}`
            : `${process.env.CLIENT_BASE_URL}/googleSignup/user?token=${encodeURIComponent(token)}`;

        res.redirect(redirectUrl);
    } catch (e) {
        next(e);
    }
};

const logoutFromGoogle = async (req, res, next) => {
    try {
        req.session.destroy(() => {
            req.logout((err) => {
                if (err) return next(err);
            });

            res.redirect(`${process.env.CLIENT_BASE_URL}`);
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    manageOauthCallback,
    logoutFromGoogle
};