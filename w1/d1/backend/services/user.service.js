const UsersSchema = require('../models/user')

const findAll = async () => {
    return UsersSchema.find()
}

const createUser = async (user) => {
    const {name, value} = user

    const newUser = new UsersSchema({
        ...user,
        [name]: value,
        dateOfBirth: new Date(user.dateOfBirth)
    })

    const savedUser = await newUser.save()
    return {
        message: 'User saved successfully',
        user: savedUser
    }
}

const updateUser = async (payload, id) => {
    const option = {new: true}
    return UsersSchema.findByIdAndUpdate(id, payload, option)
}

const deleteUser = async (id) => {
    return UsersSchema.findByIdAndDelete(id)
}

module.exports = {
    findAll,
    createUser,
    updateUser,
    deleteUser
}