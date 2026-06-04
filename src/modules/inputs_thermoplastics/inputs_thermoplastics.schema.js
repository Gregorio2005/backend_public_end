const { z } = require('zod');

/**
 * Esquema de validación para Insumos Termoplásticos.
 * Solo requiere la referencia, siguiendo el modelo simplificado.
 */
const inputsThermoplasticsSchema = z.object({
    body: z.object({
        reference: z.string({ required_error: "La referencia es obligatoria" }).min(1, "La referencia no puede estar vacía"),
        user_id: z.number().optional()
    })
});

module.exports = { inputsThermoplasticsSchema };