const { z } = require('zod');

/**
 * Esquema de validación para Tipos de Insumos utilizando Zod.
 */
const typeInputsSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "El nombre del tipo de insumo es obligatorio",
        }).min(1, "El nombre no puede estar vacío").max(100),
    }),
});

module.exports = { typeInputsSchema };