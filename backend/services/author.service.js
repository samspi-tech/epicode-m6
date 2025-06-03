const AuthorsSchema = require('../models/authors');
const { orderDirection, calcTotalPages, calcSkip } = require('../utils/order');

const findAllAuthors = async (page, pageSize, field, order) => {
    const totalAuthors = await AuthorsSchema.countDocuments();
    const totalPages = calcTotalPages(totalAuthors, pageSize);

    const authors = await AuthorsSchema
        .find()
        .sort(orderDirection(field, order))
        .limit(pageSize)
        .skip(calcSkip(page, pageSize))
        .populate('address')
        .populate('blogPosts');

    return {
        authors,
        totalAuthors,
        totalPages,
    };
};

const findSingleAuthor = async (id) => {
    return AuthorsSchema.findById(id);
};

const createAuthor = async (author) => {
    const newAuthor = new AuthorsSchema(author);
    return await newAuthor.save();
};

const updateAuthor = async (id, payload) => {
    const option = { new: true };
    return AuthorsSchema.findByIdAndUpdate(id, payload, option);
};

const deleteAuthor = async (id) => {
    return AuthorsSchema.findByIdAndDelete(id);
};

module.exports = {
    findAllAuthors,
    findSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
