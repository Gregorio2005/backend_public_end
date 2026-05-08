const { z } = require('zod');

/**
 * Esquema de validación para Usuarios
 */
const userSchema = z.object({
    body: z.object({
        user: z.string().min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        name: z.string().min(2, "El nombre es obligatorio"),
        lastname: z.string().min(2, "El apellido es obligatorio"),
        ci: z.string().min(5, "Cédula de identidad no válida"),
        email: z.string().email("Formato de correo electrónico inválido"),
        roles_id: z.number().int().positive("El ID de rol debe ser un número válido"),
        status: z.enum(['Activo', 'Inactivo']).default('Activo'),
    }),
});

/**
 * Esquema para actualización parcial de usuarios
 */
const updateUserSchema = z.object({
    body: userSchema.shape.body.partial().omit({ password: true }),
});

module.exports = { 
    userSchema,
    updateUserSchema 
};