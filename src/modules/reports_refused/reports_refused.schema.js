const { z } = require('zod');

/**
 * Esquema de validación para Reportes de Rechazo
 */
const reportsRefusedSchema = z.object({
    body: z.object({
        bill_data_id: z.number().int().positive(),
        claim_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        claim_quantity: z.number().positive("La cantidad de reclamo debe ser mayor a cero"),
        rejection_reason: z.string({
            required_error: "El motivo del rechazo es obligatorio",
        }).min(5, "El motivo debe ser más descriptivo"),
    }),
});

module.exports = { reportsRefusedSchema };