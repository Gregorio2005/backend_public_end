const UsersModel = require('./users_model');
const bcrypt = require('bcryptjs');

const UsersController = {
    getAll: async (req, res) => {
        try {
            const users = await UsersModel.findAll();
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const user = await UsersModel.findById(req.params.id);
            if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { password, ...otherData } = req.body;
            
            // Encriptar contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await UsersModel.create({
                ...otherData,
                password: hashedPassword
            });
            
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedUser = await UsersModel.update(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            res.json({ success: true, data: updatedUser });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const deleted = await UsersModel.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            res.json({ success: true, message: 'Usuario desactivado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = UsersController;