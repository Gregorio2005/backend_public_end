const { z } = require('zod');

/**
 * Esquema de validación para Insumos Químicos
 */
const inputsChemicalsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        presentation: z.boolean({
            required_error: "La presentación es obligatoria",
        }),
        batch_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        production_test: z.boolean().optional().nullable(),
    }),
});

module.exports = { inputsChemicalsSchema };