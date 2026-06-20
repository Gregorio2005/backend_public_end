const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Químicos.
 */
const inspectionChemicalsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        presentation: z.boolean("La presentación debe ser un valor booleano"),
        batch_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha de lote inválido (YYYY-MM-DD)").optional().nullable(),
        production_test: z.boolean().optional().nullable(),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        observation: z.string().max(500).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta', 'Aprobado Observacion', 'Rechazado Observacion'])
    })
});

module.exports = { inspectionChemicalsSchema };