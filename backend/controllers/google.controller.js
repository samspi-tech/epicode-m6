const jwt = require('jsonwebtoken');

const manageOauthCallback = async (req, res, next) => {
    try {
        const { user } = req;

        const token = jwt.sign(
            user,
            process.env.JSON_WEB_TOKEN_SECRET,
            { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN });

        const redirectUrl = `http://localhost:5173/success/user?token=${encodeURIComponent(token)}`;
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

            res.redirect('http://localhost:5173');
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    manageOauthCallback,
    logoutFromGoogle
};