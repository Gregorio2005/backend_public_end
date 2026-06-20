const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Cartón.
 */
const inspectionCardboardSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        height: z.number().positive("La altura debe ser mayor a cero"),
        width: z.number().positive("El ancho debe ser mayor a cero"),
        caliber: z.number().positive("El calibre debe ser mayor a cero"),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        observation: z.string().max(500).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta', 'Aprobado Observacion', 'Rechazado Observacion'])
    })
});

module.exports = { inspectionCardboardSchema };