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

/**
 * Esquema para la actualización del perfil.
 * Solo permite modificar user, password y email. Todos son opcionales.
 */
const updateProfileSchema = z.object({
    body: z.object({
        user: z.string().min(1, "El nombre de usuario no puede estar vacío").optional(),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),
        email: z.string().email("Debe proporcionar un correo electrónico válido").optional(),
    }),
});

module.exports = {
    loginSchema,
    forgotPasswordSchema,
    updateProfileSchema
};