const { z } = require('zod');

/**
 * Esquema de validación para el Maestro de Insumos.
 * Valida la relación entre el insumo específico y su tipo.
 */
const masterInputsSchema = z.object({
    body: z.object({
        inputs_id: z.number().int().positive("El ID de insumo es obligatorio"),
        type_inputs_id: z.number().int().positive("El ID de tipo de insumo es obligatorio"),
        suppliers_id: z.number().int().positive("El ID del proveedor es obligatorio"),
        status: z.enum(['Vigente', 'Desuso']).default('Vigente'),
    })
});

module.exports = { masterInputsSchema };