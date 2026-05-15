const { NODE_ENV } = require('../config/envs');

/**
 * Middleware centralizado para el manejo de errores.
 * Captura excepciones de negocio, errores de base de datos y fallos inesperados.
 */
const errorHandler = (err, req, res, next) => {
    // Prioriza el código de estado del error, de lo contrario usa 500
    const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);

    if (NODE_ENV !== 'production') {
        console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - Error:`, err.message);
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Ha ocurrido un error interno en el servidor.',
        // El stack trace solo se expone en entornos que no sean producción
        stack: NODE_ENV === 'production' ? undefined : err.stack,
    });
};

module.exports = errorHandler;