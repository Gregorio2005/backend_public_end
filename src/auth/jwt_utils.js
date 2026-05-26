const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envs');

/**
 * Crea un token JWT firmado.
 * @param {Object} payload - Información del usuario (id, rol, etc).
 * @returns {string} Token firmado válido por 8 horas.
 */
const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

module.exports = { createToken };