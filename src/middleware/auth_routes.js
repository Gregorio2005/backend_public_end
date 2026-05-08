const express = require('express');
const router = express.Router();
const AuthController = require('./auth_controller');
const { validateRequest } = require('../../middleware/validator');
const { loginSchema, forgotPasswordSchema } = require('./auth_schema');
const { verifyToken } = require('./auth');

// Endpoint público para iniciar sesión
router.post('/login', validateRequest(loginSchema), AuthController.login);

// Endpoint protegido para obtener el perfil del usuario actual
router.get('/me', verifyToken, AuthController.getMe);

// Endpoint para recuperación de contraseña (placeholder)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);

module.exports = router;