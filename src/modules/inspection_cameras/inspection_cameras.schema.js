const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Cámaras.
 */
const inspectionCamerasSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        thickness_a: z.number().positive(),
        thickness_b: z.number().positive(),
        thickness_c: z.number().positive(),
        thickness_d: z.number().positive(),
        ring_diameter_a: z.number().positive(),
        ring_diameter_b: z.number().positive(),
        ring_diameter_c: z.number().positive(),
        ring_diameter_d: z.number().positive(),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta'])
    })
});

module.exports = { inspectionCamerasSchema };