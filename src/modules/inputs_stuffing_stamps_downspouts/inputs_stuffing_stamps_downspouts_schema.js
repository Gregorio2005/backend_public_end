const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Estoperas y Bajantes
 */
const inputsStuffingSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        internal_diameter: z.number().positive("El diámetro interno debe ser un número positivo"),
        external_diameter: z.number().positive("El diámetro externo debe ser un número positivo"),
        height: z.number().positive("La altura debe ser un número positivo"),
    }),
});

module.exports = { inputsStuffingSchema };