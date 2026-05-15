const { z } = require('zod');

/**
 * Esquema de validación para Insumos Químicos (inputs_chemicals).
 */
const inputsChemicalsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        presentation: z.boolean("La presentación debe ser un valor booleano"),
        batch_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha de lote inválido (YYYY-MM-DD)"),
        production_test: z.boolean().optional().nullable()
    })
});

module.exports = { inputsChemicalsSchema };