const { z } = require('zod');

/**
 * Esquema de validación para Reportes de Aprobación.
 */
const reportsApprovedSchema = z.object({
    body: z.object({
        bill_data_id: z.number().int().positive("El ID de factura debe ser un número válido"),
        approved_quantity: z.number().positive("La cantidad aprobada debe ser mayor a cero"),
    }),
});

const reportsApprovedIncrementSchema = z.object({
    body: z.object({
        bill_data_id: z.number().int().positive("El ID de factura debe ser un número válido"),
        quantity: z.number().int().positive("La cantidad debe ser un entero positivo"),
    }),
});

module.exports = { reportsApprovedSchema, reportsApprovedIncrementSchema };