const { z } = require('zod');

/**
 * Esquema de validación para el detalle de insumos en factura
 */
const billInputsSchema = z.object({
    body: z.object({
        bill_data_id: z.number().int().positive(),
        master_inputs_id: z.number().int().positive(),
        oem_number: z.string({
            required_error: "El número OEM es obligatorio",
        }).max(100),
        quantity: z.number().positive("La cantidad debe ser mayor a cero"),
    }),
});

module.exports = { billInputsSchema };