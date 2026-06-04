/**
 * Middleware para verificar si el usuario tiene el rol de administrador.
 * En este sistema, asumimos que el roles_id 1 corresponde a 'Administrador'.
 */
const isAdmin = (req, res, next) => {
    // El usuario ya debe estar autenticado por el middleware verifyToken
    // lo que rellena el objeto req.user.
    if (req.user && (req.user.role === 1 || req.user.roles_id === 1)) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: 'Acceso prohibido: Se requieren permisos de administrador para realizar esta acción.'
    });
};

module.exports = { isAdmin };