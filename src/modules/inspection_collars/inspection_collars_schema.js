const { z } = require('zod');

/**
 * Esquema de validación para Inspecciones de Collarines
 */
const inspectionCollarsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive(),
        users_id: z.number().int().positive(),
        internal_diameter: z.number().positive(),
        height: z.number().positive(),
        joint: z.boolean(),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta']),
    }),
});

module.exports = { inspectionCollarsSchema };