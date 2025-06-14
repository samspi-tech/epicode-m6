const AuthorsSchema = require('../models/authors');
const { orderDirection, calcTotalPages, calcSkip } = require('../utils/order');

const findAllAuthors = async (page, pageSize, field, order) => {
    const totalAuthors = await AuthorsSchema.countDocuments();
    const totalPages = calcTotalPages(totalAuthors, pageSize);

    const authors = await AuthorsSchema
        .find()
        .sort(orderDirection(field, order))
        .limit(pageSize)
        .skip(calcSkip(page, pageSize));

    return {
        authors,
        totalAuthors,
        totalPages,
    };
};

const findSingleAuthor = async (authorId) => {
    return AuthorsSchema.findById(authorId);
};

const findSingleAuthorByEmail = async (email) => {
    return AuthorsSchema
        .findOne({ email })
        .select('_id');
};

const createAuthor = async (authorBody) => {
    const newAuthor = new AuthorsSchema(authorBody);
    return await newAuthor.save();
};

const updateAuthor = async (authorId, authorBody) => {
    const option = { new: true };
    return AuthorsSchema.findByIdAndUpdate(authorId, authorBody, option);
};

const deleteAuthor = async (authorId) => {
    return AuthorsSchema.findByIdAndDelete(authorId);
};

module.exports = {
    findAllAuthors,
    findSingleAuthor,
    findSingleAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
