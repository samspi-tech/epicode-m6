const Author = require('../models/authors');
const { isArrayEmpty } = require('../utils/array');
const authorsService = require('../services/author.service');
const WrongLoginInput = require('../exceptions/authors/wrongLoginInput');
const MissingLoginInput = require('../exceptions/authors/missingLoginInput');
const AuthorsNotFound = require('../exceptions/authors/authorsNotFoundException');

const EmailService = require('../services/email.service');
const email = new EmailService();

const getAllAuthors = async (req, res, next) => {
    try {
        const {
            page = 1,
            pageSize = 10,
            field = 'firstName',
            order = 'asc',
        } = req.query;

        const {
            authors,
            totalAuthors,
            totalPages
        } = await authorsService.findAllAuthors(page, pageSize, field, order);

        if (isArrayEmpty(authors)) {
            throw new AuthorsNotFound();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                authors,
                page,
                pageSize,
                totalAuthors,
                totalPages,
                field,
                order,
            });
    } catch (e) {
        next(e);
    }
};

const getSingleAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await authorsService.findSingleAuthor(id);

        if (!author) {
            throw new AuthorsNotFound();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                author,
            });
    } catch (e) {
        next(e);
    }
};

const createAuthor = async (req, res, next) => {
    try {
        const { body } = req;
        const { email: recipient } = body;
        const newAuthor = await authorsService.createAuthor(body);

        await email.send(
            `${recipient}`,
            'Account Creation',
            'Welcome to Epiblog!'
        );

        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'Author created successfully',
                newAuthor,
            });
    } catch (e) {
        next(e);
    }
};

const loginAuthor = async (req, res, next) => {
    try {
        const { body } = req;
        const { email, password } = body;

        if (!email || !password) {
            throw new MissingLoginInput();
        }

        const author = await Author.findOne({ email }).select('+password');

        if (!author || !password) {
            throw new WrongLoginInput();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                author,
            });
    } catch (e) {
        next(e);
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const author = await authorsService.updateAuthor(id, body);

        if (!author) {
            throw new AuthorsNotFound();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Author updated successfully',
                author,
            });
    } catch (e) {
        next(e);
    }
};

const uploadFileOnCloudinary = async (req, res, next) => {
    try {
        res
            .status(200)
            .send({
                statusCode: 200,
                avatar: req.file.path,
                message: 'Image uploaded successfully',
            });
    } catch (e) {
        next(e);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            throw new AuthorsNotFound();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Author deleted successfully',
                author,
            });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    loginAuthor,
    updateAuthor,
    uploadFileOnCloudinary,
    deleteAuthor,
};
