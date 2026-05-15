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

const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().email("Debe proporcionar un correo electrónico válido"),
    }),
});

module.exports = {
    loginSchema,
    forgotPasswordSchema
};