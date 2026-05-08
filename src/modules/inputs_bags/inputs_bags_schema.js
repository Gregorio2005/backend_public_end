const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Bolsas
 */
const inputsBagsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive(),
        height: z.number().positive("La altura debe ser un número positivo"),
        width: z.number().positive("El ancho debe ser un número positivo"),
        art: z.number().positive("El arte debe ser un número positivo"),
        caliber: z.number().positive("El calibre debe ser un número positivo"),
    }),
});

module.exports = { inputsBagsSchema };