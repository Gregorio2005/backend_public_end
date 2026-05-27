/**
 * Middleware para validar los datos de entrada de la petición utilizando la librería Zod.
 * 
 * @param {import('zod').ZodSchema} schema - El esquema de Zod contra el cual se validará la petición.
 * @returns {Function} Middleware de Express que valida body, query y params.
 */
const validateRequest = (schema) => (req, res, next) => {
    try {
        // Validamos y extraemos los datos (Zod aplica transformaciones y valores por defecto aquí)
        const validatedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // Reasignamos los datos validados a la petición para que el controlador reciba tipos correctos
        if (validatedData.body) req.body = validatedData.body;
        if (validatedData.query) req.query = validatedData.query;
        if (validatedData.params) req.params = validatedData.params;

        next();
    } catch (error) {
        // CRÍTICO: Protección con encadenamiento opcional y coalescencia nula
        // Si error.errors no existe, se devuelve un array con un error genérico.
        const formattedErrors = error?.errors?.map(err => ({
            field: err.path?.join('.') || 'unknown',
            message: err.message || 'Error de validación inesperado'
        })) || [{ field: 'request', message: 'La estructura de la petición es inválida o está vacía' }];

        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
    }
};

module.exports = { validateRequest };