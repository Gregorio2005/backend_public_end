const NotificacionesModel = require('./notifications.model');

const NotificacionesService = {
    findByUser: (userId) => NotificacionesModel.findByUser(userId),
    countUnread: (userId) => NotificacionesModel.countUnread(userId),
    markAsRead: async (id) => {
        const result = await NotificacionesModel.markAsRead(id);
        if (!result) throw new Error('Notificación no encontrada');
        return result;
    },
    markAllAsRead: (userId) => NotificacionesModel.markAllAsRead(userId),
    create: (userId, message) => NotificacionesModel.create(userId, message)
};

module.exports = NotificacionesService;
