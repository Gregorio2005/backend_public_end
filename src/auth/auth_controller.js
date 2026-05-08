const AuthService = require('./auth_service');

const AuthController = {
    /**
     * Maneja la petición de login.
     */
    login: async (req, res, next) => {
        try {
            const { user, password } = req.body;
            const result = await AuthService.login(user, password);
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    },

    /**
     * Maneja la obtención del perfil actual (/me).
     */
    getMe: async (req, res, next) => {
        try {
            const result = await AuthService.getProfile(req.user.id);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Placeholder para la lógica de recuperación de contraseña.
     */
    forgotPassword: async (req, res, next) => {
        try {
            // En una implementación real, aquí se generaría un token de reset
            // y se enviaría un correo electrónico.
            res.json({ 
                success: true, 
                message: 'Si el usuario existe, se han enviado instrucciones de recuperación.' 
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AuthController;