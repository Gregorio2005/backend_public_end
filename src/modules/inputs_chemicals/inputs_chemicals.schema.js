const { z } = require('zod');

/**
 * Esquema de validación para Insumos Químicos.
 * Solo requiere la referencia, ya que no posee especificaciones técnicas adicionales.
 */
const inputsChemicalsSchema = z.object({
    body: z.object({
        reference: z.string({ required_error: "La referencia es obligatoria" }).min(1, "La referencia no puede estar vacía"),
        user_id: z.number().optional()
    })
});

module.exports = { inputsChemicalsSchema };