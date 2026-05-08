const { z } = require('zod');

/**
 * Esquema de validación para Reportes de Aprobación
 */
const reportsApprovedSchema = z.object({
    body: z.object({
        bill_data_id: z.number({
            required_error: "El ID de la factura es obligatorio",
        }).int().positive(),
        approved_quantity: z.number().positive("La cantidad aprobada debe ser mayor a cero"),
    }),
});

module.exports = { reportsApprovedSchema };