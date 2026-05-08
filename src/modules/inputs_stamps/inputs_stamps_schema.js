const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Sellos (Stamps)
 */
const inputsStampsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        internal_diameter: z.number().positive("El diámetro interno debe ser un número positivo"),
        external_diameter: z.number().positive("El diámetro externo debe ser un número positivo"),
        height_a: z.number().positive("La altura A debe ser un número positivo"),
        height_b: z.number().positive("La altura B debe ser un número positivo"),
    }),
});

module.exports = { inputsStampsSchema };