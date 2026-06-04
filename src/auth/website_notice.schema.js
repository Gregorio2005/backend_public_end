const { z } = require('zod');

const createWebsiteNoticeSchema = z.object({
    body: z.object({
        name: z.string().min(1, "El nombre del aviso es obligatorio."),
        note: z.string().min(1, "El contenido del aviso es obligatorio."),
    }),
});

module.exports = {
    createWebsiteNoticeSchema,
};