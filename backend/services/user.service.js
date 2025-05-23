const UsersSchema = require('../models/user');
const { orderDirection, calcTotalPages, calcSkip } = require('../utils/order');

const findAllUsers = async (page, pageSize, field, order) => {
    const totalUsers = await UsersSchema.countDocuments();
    const totalPages = calcTotalPages(totalUsers, pageSize);

    const users = await UsersSchema.find()
        .sort(orderDirection(field, order))
        .limit(pageSize)
        .skip(calcSkip(page, pageSize));

    return {
        totalUsers,
        totalPages,
        users,
    };
};

const findSingleUser = async (id) => {
    return UsersSchema.findById(id);
};

const createUser = async (user) => {
    const newUser = new UsersSchema(user);
    return await newUser.save();
};

const updateUser = async (payload, id) => {
    const option = { new: true };
    return UsersSchema.findByIdAndUpdate(id, payload, option);
};

const deleteUser = async (id) => {
    return UsersSchema.findByIdAndDelete(id);
};

module.exports = {
    findAllUsers,
    findSingleUser,
    createUser,
    updateUser,
    deleteUser,
};
