const WebsiteNoticeModel = require('./website_notice.model');
const { clearCache } = require('../middleware/cache');

const WebsiteNoticeController = {
    /**
     * Crea un nuevo aviso web.
     */
    createWebsiteNotice: async (req, res, next) => {
        try {
            const { name, note } = req.body;

            const newNotice = await WebsiteNoticeModel.create(name, note);

            res.status(201).json({
                success: true,
                message: 'Aviso web creado con éxito.',
                data: newNotice,
            });
            clearCache('notices');
        } catch (error) {
            next(error);
        }
    },

    /**
     * Obtiene todos los avisos web registrados.
     */
    getNotices: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const result = await WebsiteNoticeModel.getAll({ page, limit });
            res.status(200).json({
                success: true,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Obtiene un aviso específico por ID (para edición en el panel admin).
     */
    getNoticeById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const notice = await WebsiteNoticeModel.getById(id);

            if (!notice) {
                return res.status(404).json({
                    success: false,
                    message: 'El comunicado seleccionado no existe en la base de datos.',
                });
            }

            res.status(200).json({
                success: true,
                data: notice,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Marca un aviso como el activo para mostrar en la web.
     */
    publishNotice: async (req, res, next) => {
        try {
            const { id } = req.params;
            const notice = await WebsiteNoticeModel.setActive(id);

            res.status(200).json({
                success: true,
                message: 'Aviso publicado oficialmente en el sitio web.',
                data: notice,
            });
            clearCache('notices');
        } catch (error) {
            next(error);
        }
    }
};

module.exports = WebsiteNoticeController;