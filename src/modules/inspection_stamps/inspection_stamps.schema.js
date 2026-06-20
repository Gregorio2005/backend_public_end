const { z } = require('zod');

/**
 * Esquema de validación para Inspección de Sellos.
 */
const inspectionStampsSchema = z.object({
    body: z.object({
        bill_inputs_id: z.number().int().positive("ID de entrada de factura inválido"),
        users_id: z.number().int().positive("ID de usuario inválido"),
        internal_diameter: z.number().positive("El diámetro interno debe ser mayor a cero"),
        external_diameter: z.number().positive("El diámetro externo debe ser mayor a cero"),
        height_a: z.number().positive("La altura A debe ser mayor a cero"),
        height_b: z.number().positive("La altura B debe ser mayor a cero"),
        review_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        observation: z.string().max(500).optional().nullable(),
        status: z.enum(['Aprobado', 'Rechazado', 'Observacion', 'Incompleta', 'Aprobado Observacion', 'Rechazado Observacion'])
    })
});

module.exports = { inspectionStampsSchema };