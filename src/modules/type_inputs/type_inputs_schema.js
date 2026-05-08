const { z } = require('zod');

/**
 * Esquema de validación para Tipos de Insumos
 */
const typeInputSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "El nombre del tipo de insumo es obligatorio",
            invalid_type_error: "El nombre debe ser una cadena de texto",
        }).min(2, "El nombre es muy corto").max(100),
    }),
});

module.exports = { typeInputSchema };