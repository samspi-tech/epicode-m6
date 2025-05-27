const { isArrayEmpty } = require('../utils/array');
const authorsService = require('../services/author.service');
const AuthorsNotFound = require('../exceptions/authors/authorsNotFoundException');

const getAllAuthors = async (req, res, next) => {
    try {
        const {
            page = 1,
            pageSize = 10,
            field = 'avatar',
            order = 'asc',
        } = req.query;

        const { authors, totalAuthors, totalPages } =
            await authorsService.findAllAuthors(page, pageSize, field, order);

        if (isArrayEmpty(authors)) {
            throw new AuthorsNotFound();
        }

        res.status(200).send({
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

        res.status(200).send({
            statusCode: 200,
            author,
        });
    } catch (e) {
        next(e);
    }
};

const createAuthor = async (req, res) => {
    try {
        const { body } = req;
        const author = await authorsService.createAuthor(body);

        res.status(201).send({
            statusCode: 201,
            message: 'Author created successfully',
            author,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const author = await authorsService.updateAuthor(id, body);

        if (!author) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Author not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Author updated successfully',
            author,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Author not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Author deleted successfully',
            author,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
