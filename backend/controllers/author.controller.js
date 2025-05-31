require('dotenv').config();
const jsonWebToken = require('jsonwebtoken');
const { isArrayEmpty } = require('../utils/array');
const authorsService = require('../services/author.service');
const AuthorsNotFound = require('../exceptions/authors/authorsNotFoundException');

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
        const newAuthor = await authorsService.createAuthor(body);

        const token = jsonWebToken.sign(
            { id: newAuthor._id }, process.env.JSON_WEB_TOKEN_SECRET,
            { expiresIn: process.env.JSON_WEB_TOKEN_EXPIRES_IN }
        );

        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'Author created successfully',
                token,
                newAuthor,
            });
    } catch (e) {
        next(e);
        console.log(e);
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
            .json(req.file)
            .send({
                statusCode: 200,
                message: 'Author updated successfully',
                author,
            });
    } catch (e) {
        next(e);
        console.log(e);
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
    updateAuthor,
    deleteAuthor,
};
