const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envs');

/**
 * Middleware para proteger rutas privadas mediante la verificación del token JWT.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Espera el formato "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ success: false, message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
    }
};

module.exports = { verifyToken };