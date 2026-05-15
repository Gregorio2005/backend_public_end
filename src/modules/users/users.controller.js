const UsersService = require('./users.service');

const UsersController = {
    getAll: async (req, res, next) => {
        try {
            const users = await UsersService.getAllUsers();
            res.json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const user = await UsersService.getUserById(req.params.id);
            res.json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const result = await UsersService.createUser(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const result = await UsersService.updateUser(req.params.id, req.body);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await UsersService.deleteUser(req.params.id);
            res.json({ success: true, message: 'Usuario desactivado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = UsersController;