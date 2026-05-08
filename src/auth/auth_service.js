const UsersModel = require('../modules/users/users_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envs');

const AuthService = {
    /**
     * Lógica de autenticación: verifica credenciales y genera un token JWT.
     */
    login: async (username, password) => {
        // Buscar usuario por nombre de usuario
        const user = await UsersModel.findByUsername(username);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Verificar si el usuario está activo
        if (user.status !== 'Activo') {
            throw new Error('Usuario inactivo. Contacte al administrador.');
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        // Generar JWT
        const token = jwt.sign(
            { id: user.id, user: user.user, roles_id: user.roles_id },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Retornar datos (sin password)
        const { password: _, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    },

    /**
     * Obtiene el perfil del usuario autenticado.
     */
    getProfile: async (id) => {
        const user = await UsersModel.findById(id);
        if (!user) throw new Error('Usuario no encontrado');
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};

module.exports = AuthService;