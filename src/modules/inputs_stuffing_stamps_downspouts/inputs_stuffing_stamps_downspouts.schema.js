const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Empaquetaduras (inputs_stuffing_stamps_downspouts).
 */
const inputsStuffingStampsDownspoutsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        internal_diameter: z.number().positive("El diámetro interno debe ser mayor a cero"),
        external_diameter: z.number().positive("El diámetro externo debe ser mayor a cero"),
        height: z.number().positive("La altura debe ser mayor a cero")
    })
});

module.exports = { inputsStuffingStampsDownspoutsSchema };