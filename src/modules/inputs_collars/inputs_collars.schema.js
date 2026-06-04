const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Collares.
 * Basado en la estructura: id, reference, user_id, internal_diameter, height.
 */
const inputsCollarsSchema = z.object({
    body: z.object({
        reference: z.string({ required_error: "La referencia es obligatoria" }).min(1, "La referencia no puede estar vacía"),
        user_id: z.number().int().positive("El ID de usuario debe ser válido").optional(),
        internal_diameter: z.number({ required_error: "El diámetro interno es obligatorio" }).positive("El diámetro debe ser mayor a cero"),
        height: z.number({ required_error: "La altura es obligatoria" }).positive("La altura debe ser mayor a cero")
    })
});

module.exports = { inputsCollarsSchema };