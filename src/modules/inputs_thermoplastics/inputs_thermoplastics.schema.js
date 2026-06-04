const { z } = require('zod');

/**
 * Esquema de validación para Insumos Termoplásticos (inputs_thermoplastics).
 */
const inputsThermoplasticsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        visual: z.boolean("El campo 'visual' debe ser un valor booleano")
    })
});

module.exports = { inputsThermoplasticsSchema };