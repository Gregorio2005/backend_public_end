const { z } = require('zod');

/**
 * Esquema de validación para Usuarios
 */
const userSchema = z.object({
    body: z.object({
        user: z.string()
            .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
            .regex(/^[a-zA-Z0-9]+$/, "El nombre de usuario no debe contener espacios ni caracteres especiales"),
        password: z.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .regex(/^[^\s"'`]+$/, "La contraseña no debe contener espacios ni comillas"),
        name: z.string()
            .min(2, "El nombre es obligatorio")
            .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "El nombre solo debe contener letras"),
        lastname: z.string()
            .min(2, "El apellido es obligatorio")
            .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "El apellido solo debe contener letras"),
        ci: z.string()
            .min(5, "Cédula de identidad no válida")
            .regex(/^V-|E-/, "La cédula debe comenzar con V- o E-"),
        email: z.string()
            .email("Formato de correo electrónico inválido")
            .regex(/^[^\s"'`]+$/, "El correo no debe contener espacios ni comillas"),
        roles_id: z.number().int().positive("El ID de rol debe ser un número válido"),
        status: z.enum(['Activo', 'Inactivo']).default('Activo'),
    }),
});

/**
 * Esquema para actualización parcial de usuarios
 */
const updateUserSchema = z.object({
    body: z.object({
        user: z.string()
            .min(1)
            .regex(/^[a-zA-Z0-9]+$/, "El nombre de usuario no debe contener espacios ni caracteres especiales")
            .optional(),
        name: z.string()
            .min(1)
            .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "El nombre solo debe contener letras")
            .optional(),
        lastname: z.string()
            .min(1)
            .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "El apellido solo debe contener letras")
            .optional(),
        ci: z.string()
            .min(1)
            .optional(),
        email: z.string()
            .email()
            .regex(/^[^\s"'`]+$/, "El correo no debe contener espacios ni comillas")
            .optional(),
        roles_id: z.number().int().positive().optional(),
        status: z.enum(['Activo', 'Inactivo']).optional(),
    }),
});

module.exports = { 
    userSchema,
    updateUserSchema 
};