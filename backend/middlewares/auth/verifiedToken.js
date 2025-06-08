const jwt = require('jsonwebtoken');
const publicRoutes = require('../../config/publicRoutes');
const InvalidOrMissingTokenException = require('../../exceptions/auth/InvalidOrMissingTokenException');

const verifiedToken = async (req, res, next) => {
    if (publicRoutes.includes(req.path)) return next();

    const token = req.header('Authorization');
    if (!token) throw new InvalidOrMissingTokenException();

    try {
        req.user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = verifiedToken;