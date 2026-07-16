const rateLimit = require('express-rate-limit');

const RATE_LIMIT_MSG = 'Se ha excedido el límite de solicitudes, intente más tarde.';

/**
 * Límite estricto para el login.
 * 5 intentos por ventana de 15 minutos por IP.
 * Previene ataques de fuerza bruta.
 */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: RATE_LIMIT_MSG },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Límite para endpoints GET públicos de la website
 * (website-notice, website-products).
 * 10 peticiones por ventana de 15 minutos por IP.
 */
const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: RATE_LIMIT_MSG },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Límite para el envío de postulaciones (POST /api/applicants).
 * 3 peticiones por ventana de 15 minutos por IP.
 * Un usuario real postula una vez, máximo 2-3 si rellena el formulario.
 */
const applicantLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { success: false, message: RATE_LIMIT_MSG },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter, publicLimiter, applicantLimiter };
