const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Collarines
 */
const inputsCollarsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        internal_diameter: z.number().positive("El diámetro interno debe ser un número positivo"),
        height: z.number().positive("La altura debe ser un número positivo"),
        joint: z.boolean({
            required_error: "La junta es obligatoria",
        }),
    }),
});

module.exports = { inputsCollarsSchema };