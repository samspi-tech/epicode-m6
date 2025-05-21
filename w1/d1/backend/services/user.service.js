const UsersSchema = require('../models/user');

const findAllUsers = async () => {
    return UsersSchema.find();
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

    const savedUser = await newUser.save();
    return {
        message: 'User saved successfully',
        user: savedUser,
    };
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
