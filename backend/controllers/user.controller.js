const usersService = require('../services/user.service');
const { isArrayEmpty } = require('../utils/array');

const getAllUsers = async (req, res) => {
    try {
        const {
            page = 1,
            pageSize = 10,
            field = 'username',
            order = 'asc',
        } = req.query;

        const { users, totalUsers, totalPages } =
            await usersService.findAllUsers(page, pageSize, field, order);

        if (isArrayEmpty(users)) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No user found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            users,
            page,
            pageSize,
            totalUsers,
            totalPages,
            field,
            order,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.findSingleUser(id);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No user found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            user,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const user = await usersService.createUser(body);

        res.status(201).send({
            statusCode: 201,
            message: 'User created successfully',
            user,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const user = await usersService.updateUser(body, id);

        if (!user) {
            res.status(404).send({
                statusCode: 404,
                message: 'User not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'User edited successfully',
            user,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.deleteUser(id);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'User deleted successfully',
            user,
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
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
};
