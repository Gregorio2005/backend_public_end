const { z } = require('zod');

/**
 * Esquema de validación para el detalle de insumos por factura.
 */
const billInputsSchema = z.object({
    body: z.object({
        bill_data_id: z.number().int().positive("ID de factura inválido"),
        master_inputs_id: z.number().int().positive("ID de maestro de insumos inválido"),
        oem_number: z.string().min(1, "El número OEM es obligatorio").max(100),
        quantity: z.number().positive("La cantidad debe ser mayor a cero")
    })
});

module.exports = { billInputsSchema };