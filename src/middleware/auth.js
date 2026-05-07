const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envs');

/**
 * Middleware para proteger rutas mediante JWT
 */
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'No autorizado, falta el token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token no válido' });
    }
};

module.exports = { protect };