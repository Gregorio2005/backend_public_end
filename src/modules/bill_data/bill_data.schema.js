const { z } = require('zod');

/**
 * Esquema de validación para los datos de factura.
 */
const billDataSchema = z.object({
    body: z.object({
        bill_nro: z.string().max(100).optional().nullable(),
        billing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        odoo: z.string().min(1, "El campo odoo es obligatorio").max(100),
        nro_exp: z.string().max(100).optional().nullable(),
        nro_reception: z.string().max(100).optional().nullable(),
        receipt_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
        suppliers_id: z.number().int().positive("El ID de proveedor debe ser un número válido")
    })
});

module.exports = { billDataSchema };