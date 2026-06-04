const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Bolsas (inputs_bags).
 */
const inputsBagsSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        height: z.number().positive("La altura debe ser mayor a cero"),
        width: z.number().positive("El ancho debe ser mayor a cero"),
        art: z.number().positive("El campo art debe ser mayor a cero"),
        caliber: z.number().positive("El calibre debe ser mayor a cero")
    })
});

module.exports = { inputsBagsSchema };