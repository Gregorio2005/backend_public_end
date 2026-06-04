const { z } = require('zod');

/**
 * Esquema de validación para Insumos de Cámaras (inputs_cameras).
 */
const inputsCamerasSchema = z.object({
    body: z.object({
        reference: z.string().min(1, "La referencia es obligatoria"),
        user_id: z.number().int().positive("El ID de usuario es obligatorio"),
        thickness_a: z.number().positive(),
        thickness_b: z.number().positive(),
        thickness_c: z.number().positive(),
        thickness_d: z.number().positive(),
        ring_diameter_a: z.number().positive(),
        ring_diameter_b: z.number().positive(),
        ring_diameter_c: z.number().positive(),
        ring_diameter_d: z.number().positive()
    })
});

module.exports = { inputsCamerasSchema };