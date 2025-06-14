const authService = require('../services/auth.service');
const AuthorNotFoundException = require('../exceptions/authors/authorsNotFoundException');

const loginAuth = async (req, res, next) => {
    try {
        const { body } = req;
        const { email, password } = body;

        const { token } = await authService.loginAuth(email, password);

        res
            .header('Authorization', token)
            .status(200)
            .send({
                statusCode: 200,
                message: 'Login successfully',
                token
            });
    } catch (e) {
        next(e);
    }
};

const getMe = async (req, res, next) => {
    try {
        const provider = req.user.provider;

        const userEmail = provider === 'google'
            ? req.user.emails[0].value
            : req.user.email;
        
        const user = await authService.findMe(userEmail);
        if (!user) throw new AuthorNotFoundException();

        res
            .status(200)
            .send({
                statusCode: 200,
                user
            });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    loginAuth,
    getMe
};