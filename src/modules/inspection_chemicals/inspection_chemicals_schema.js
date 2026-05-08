const { z } = require('zod');

/**
 * Esquema de validación para Inspecciones de Químicos
 */
const inspectionChemicalsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive(),
        users_id: z.number().int().positive(),
        presentation: z.boolean(),
        batch_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        production_test: z.boolean(),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta']),
    }),
});

module.exports = { inspectionChemicalsSchema };