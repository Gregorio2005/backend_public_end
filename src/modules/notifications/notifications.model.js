const pool = require('../../config/db');

const NotificacionesModel = {
    findByUser: async (userId) => {
        const { rows } = await pool.query(
            'SELECT * FROM public.notificaciones WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
            [userId]
        );
        return rows;
    },

    countUnread: async (userId) => {
        const { rows } = await pool.query(
            `SELECT COUNT(*)::int AS count FROM public.notificaciones 
             WHERE user_id = $1 AND status = 'No visto'`,
            [userId]
        );
        return rows[0].count;
    },

    markAsRead: async (id) => {
        const { rows } = await pool.query(
            `UPDATE public.notificaciones SET status = 'Visto' WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows[0];
    },

    markAllAsRead: async (userId) => {
        await pool.query(
            `UPDATE public.notificaciones SET status = 'Visto' 
             WHERE user_id = $1 AND status = 'No visto'`,
            [userId]
        );
    },

    create: async (userId, message) => {
        const { rows } = await pool.query(
            'INSERT INTO public.notificaciones (user_id, message) VALUES ($1, $2) RETURNING *',
            [userId, message]
        );
        return rows[0];
    }
};

module.exports = NotificacionesModel;
