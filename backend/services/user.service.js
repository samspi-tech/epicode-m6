const UsersSchema = require('../models/user');

const findAllUsers = async (page, pageSize, field, order) => {
    const totalUsers = await UsersSchema.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    const users = await UsersSchema.find()
        .sort({ [field]: order === 'desc' ? -1 : 1 })
        .limit(pageSize)
        .skip((page - 1) * pageSize);

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
    const { name, value } = user;

    const newUser = new UsersSchema({
        ...user,
        [name]: value,
    });

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
