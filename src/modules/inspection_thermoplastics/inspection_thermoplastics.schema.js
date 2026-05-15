const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Termoplásticos (inspection_thermoplastics).
 */
const inspectionThermoplasticsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        visual: z.boolean("El campo 'visual' debe ser un valor booleano"),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta'])
    })
});

module.exports = { inspectionThermoplasticsSchema };