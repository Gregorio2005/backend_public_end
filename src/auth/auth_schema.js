const { z } = require('zod');

/**
 * Esquema de validación para el inicio de sesión (Login)
 */
const loginSchema = z.object({
    body: z.object({
        user: z.string().min(1, "El nombre de usuario es obligatorio"),
        password: z.string().min(1, "La contraseña es obligatoria"),
    }),
});

module.exports = {
    loginSchema
};