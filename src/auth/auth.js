const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envs');
const AuthController = require('./auth.controller');

const router = express.Router();

/**
 * Middleware para verificar la validez del token JWT en las cabeceras de la petición.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: 'Acceso denegado. Formato de token inválido o no proporcionado.' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token inválido o expirado.' 
        });
    }
};

// Aquí se definirán las rutas del módulo auth utilizando los nuevos nombres de endpoints
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', verifyToken, AuthController.getMe);
router.post('/forgot_password', AuthController.forgotPassword);

module.exports = { 
    verifyToken,
    authRouter: router 
};