const { z } = require('zod');

/**
 * Esquema de validación para Inspecciones de Bolsas
 */
const inspectionBagsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive(),
        users_id: z.number().int().positive(),
        height: z.number().positive(),
        width: z.number().positive(),
        art: z.number().positive(),
        caliber: z.number().positive(),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta']),
    }),
});

module.exports = { inspectionBagsSchema };