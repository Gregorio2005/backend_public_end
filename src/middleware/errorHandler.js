const { NODE_ENV } = require('../config/envs');

/**
 * Middleware global para manejo de errores.
 * Transforma errores técnicos (DB, JWT, etc.) en respuestas legibles.
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || 'Error interno del servidor';

    // Manejo de errores específicos de PostgreSQL (códigos de error de pg)
    if (err.code) {
        switch (err.code) {
            case '23505': // Unique violation (Llave duplicada)
                statusCode = 409; // Conflict
                const detail = err.detail || '';
                if (detail.includes('user')) message = 'El nombre de usuario ya está registrado.';
                else if (detail.includes('email')) message = 'El correo electrónico ya está registrado.';
                else if (detail.includes('ci')) message = 'La cédula de identidad ya está registrada.';
                else if (detail.includes('pkey')) message = 'El ID proporcionado ya existe en el sistema.';
                else message = 'Ya existe un registro con estos datos únicos.';
                break;
            
            case '23503': // Foreign key violation
                statusCode = 400;
                message = 'Error de referencia: El dato (ID) relacionado no existe en la base de datos.';
                break;

            case '22P02': // Invalid text representation (ej: enviar texto en campo numérico)
                statusCode = 400;
                message = 'Formato de datos inválido en la petición.';
                break;
        }
    }

    res.status(statusCode).json({
        success: false,
        message,
        // El stack trace solo se envía en desarrollo para facilitar el debug
        stack: NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;