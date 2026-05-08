const { z } = require('zod');

/**
 * Esquema de validación para el Inventario Maestro
 */
const masterInputSchema = z.object({
    body: z.object({
        inputs_id: z.number({
            required_error: "El ID del insumo específico es obligatorio",
        }).int().positive(),
        type_inputs_id: z.number({
            required_error: "El ID del tipo de insumo es obligatorio",
        }).int().positive(),
        status: z.enum(['Vigente', 'Desuso'], {
            required_error: "El estado debe ser 'Vigente' o 'Desuso'",
            invalid_type_error: "Estado no válido",
        }),
    }),
});

module.exports = { masterInputSchema };