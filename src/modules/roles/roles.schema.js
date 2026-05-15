const { z } = require('zod');

/**
 * Esquema para la validación de roles.
 */
const rolesSchema = z.object({
    body: z.object({
        name: z.string().min(1, "El nombre del rol es obligatorio").max(100)
    })
});

module.exports = { rolesSchema };