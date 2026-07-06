const { z } = require('zod');

const websiteProductSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "El nombre del producto es obligatorio",
            invalid_type_error: "El nombre debe ser una cadena de texto",
        }).min(1, "El nombre no puede estar vacío").max(100, "El nombre no puede exceder 100 caracteres"),
        description: z.string({
            required_error: "La descripción es obligatoria",
            invalid_type_error: "La descripción debe ser una cadena de texto",
        }).min(1, "La descripción no puede estar vacía"),
        display_order: z.string({
            required_error: "El orden de visualización es obligatorio",
        }).refine((val) => {
            const num = Number(val);
            return Number.isInteger(num) && num >= 0 && num <= 5;
        }, "El orden de visualización debe ser un número entero del 0 al 5"),
        status: z.enum(['Activo', 'Inactivo'], {
            required_error: "El estado es obligatorio",
            invalid_type_error: "El estado debe ser 'Activo' o 'Inactivo'",
        }),
    }),
});

module.exports = { websiteProductSchema };
