const { z } = require('zod');

/**
 * Esquema de validación para Insumos Termoplásticos
 */
const inputsThermoplasticsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        visual: z.boolean({
            required_error: "La inspección visual es obligatoria (true/false)",
        }),
    }),
});

module.exports = { inputsThermoplasticsSchema };