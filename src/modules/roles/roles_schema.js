const { z } = require('zod');

/**
 * Esquema de validación para Roles
 */
const roleSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "El nombre del rol es obligatorio",
            invalid_type_error: "El nombre debe ser una cadena de texto",
        }).min(3, "El nombre debe tener al menos 3 caracteres").max(100),
    }),
});

module.exports = { roleSchema };