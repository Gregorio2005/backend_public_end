const NotificacionesService = require('./notifications.service');

const NotificacionesController = {
    getAll: async (req, res, next) => {
        try {
            const data = await NotificacionesService.findByUser(req.user.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getUnreadCount: async (req, res, next) => {
        try {
            const count = await NotificacionesService.countUnread(req.user.id);
            res.json({ success: true, data: { count } });
        } catch (error) {
            next(error);
        }
    },

    markAsRead: async (req, res, next) => {
        try {
            const data = await NotificacionesService.markAsRead(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    markAllAsRead: async (req, res, next) => {
        try {
            await NotificacionesService.markAllAsRead(req.user.id);
            res.json({ success: true, message: 'Todas las notificaciones marcadas como leídas.' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = NotificacionesController;
