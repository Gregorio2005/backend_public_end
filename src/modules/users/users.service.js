const UsersModel = require('./users.model');
const bcrypt = require('bcryptjs');

const UsersService = {
    getAllUsers: async () => {
        return await UsersModel.findAll();
    },

    getUserById: async (id) => {
        const user = await UsersModel.findById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    createUser: async (userData) => {
        // Verificar si el username ya existe (Lógica más allá del CRUD)
        const existingUser = await UsersModel.findByUsername(userData.user);
        if (existingUser) throw new Error('El nombre de usuario ya está en uso');

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        return await UsersModel.create({
            ...userData,
            password: hashedPassword
        });
    },

    updateUser: async (id, userData) => {
        // Si intentan actualizar la contraseña por aquí, lo evitamos o manejamos aparte
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }

        const result = await UsersModel.update(id, userData);
        if (!result) throw new Error('Usuario no encontrado para actualizar');
        return result;
    },

    deleteUser: async (id) => {
        // Soft delete (cambio de estado a 'Inactivo')
        const result = await UsersModel.delete(id);
        if (!result) throw new Error('Usuario no encontrado para desactivar');
        return result;
    }
};

module.exports = UsersService;