const WebsiteNoticeModel = require('./website_notice.model');

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
        } catch (error) {
            next(error);
        }
    },

    /**
     * Obtiene todos los avisos web registrados.
     */
    getNotices: async (req, res, next) => {
        try {
            const notices = await WebsiteNoticeModel.getAll();
            res.status(200).json({
                success: true,
                data: notices,
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = WebsiteNoticeController;