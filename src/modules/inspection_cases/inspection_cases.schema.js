const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Cajas.
 */
const inspectionCasesSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        caliber: z.number().positive("El calibre debe ser mayor a cero"),
        armed: z.number().positive("El campo armed debe ser mayor a cero"),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        observation: z.string().max(100).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta'])
    })
});

module.exports = { inspectionCasesSchema };