const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Estuches
 */
const inputsCasesSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        caliber: z.number().positive("El calibre debe ser un número positivo"),
        armed: z.number().positive("La medida de armado debe ser un número positivo"),
    }),
});

module.exports = { inputsCasesSchema };