const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const { validateRequest } = require('../middleware/validator');
const { loginSchema, forgotPasswordSchema, updateProfileSchema, resetPasswordSchema } = require('./auth.schema');
const { verifyToken } = require('./auth');
const { loginLimiter } = require('../middleware/rateLimiter');

// Endpoint público para registrar un nuevo usuario
router.post('/register', AuthController.register);

// Endpoint público para iniciar sesión
router.post('/login', loginLimiter, validateRequest(loginSchema), AuthController.login);

// Endpoint protegido para obtener el perfil del usuario actual
router.get('/me', verifyToken, AuthController.getMe);

// Ruta para: http://localhost:3000/api/auth/profile
router.get('/profile', verifyToken, AuthController.getProfile);

// Ruta para: http://localhost:3000/api/auth/profile_update
router.put('/profile_update', verifyToken, validateRequest(updateProfileSchema), AuthController.updateProfile);

// Endpoint para recuperación de contraseña
router.post('/forgot_password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);

// Endpoint para restablecer la contraseña con el token
router.post('/reset_password', validateRequest(resetPasswordSchema), AuthController.resetPassword);

module.exports = router;