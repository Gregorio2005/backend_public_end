const { validationResult } = require('express-validator');

/**
 * Verifica si hay errores de validación en la petición
 */
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { validateRequest };