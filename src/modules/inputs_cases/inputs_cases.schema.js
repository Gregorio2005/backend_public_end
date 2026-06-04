const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Cajas (inputs_cases).
 */
const inputsCasesSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        caliber: z.number().positive("El calibre debe ser mayor a cero"),
        armed: z.number().positive("El campo armed debe ser mayor a cero")
    })
});

module.exports = { inputsCasesSchema };