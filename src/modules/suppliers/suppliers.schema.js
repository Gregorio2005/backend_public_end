const { z } = require('zod');

/**
 * Esquema de validación para Proveedores
 */
const supplierSchema = z.object({
    body: z.object({
        user_id: z.number({
            required_error: "El ID de usuario es obligatorio",
            invalid_type_error: "El ID de usuario debe ser un número",
        }).int().positive(),
        name: z.string({
            required_error: "El nombre del proveedor es obligatorio",
            invalid_type_error: "El nombre debe ser una cadena de texto",
        }).min(3, "El nombre debe tener al menos 3 caracteres").max(100),
    }),
});

module.exports = { supplierSchema };