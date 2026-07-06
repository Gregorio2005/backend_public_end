const UsersModel = require('./users.model');
const bcrypt = require('bcryptjs');
const pool = require('../../config/db');

const UsersService = {
    getAllUsers: async (params) => {
        return await UsersModel.findAll(params);
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
        const { user, email } = userData;

        // 1. Validar unicidad si se intenta cambiar username o email
        if (user || email) {
            const checkConflict = await pool.query(
                'SELECT "user", email FROM public.users WHERE ("user" = $1 OR email = $2) AND id != $3',
                [user || null, email || null, id]
            );

            if (checkConflict.rows.length > 0) {
                const conflict = checkConflict.rows[0];
                const isUserConflict = user && conflict.user === user;
                const message = isUserConflict ? 'El nombre de usuario ya está ocupado' : 'El correo electrónico ya está registrado por otro usuario';
                throw new Error(message);
            }
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