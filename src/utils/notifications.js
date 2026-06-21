const pool = require('../config/db');

/**
 * Crea una notificación para un usuario específico.
 * Fire-and-forget: no bloquea la respuesta HTTP.
 */
const createNotification = async (userId, message) => {
    try {
        await pool.query(
            'INSERT INTO notificaciones (user_id, message) VALUES ($1, $2)',
            [userId, message]
        );
    } catch (error) {
        console.error('Error al crear notificación (no bloquea):', error.message);
    }
};

/**
 * Obtiene todos los IDs de usuarios de un rol específico.
 */
const getUserIdsByRole = async (roleId) => {
    try {
        const result = await pool.query(
            'SELECT id FROM users WHERE roles_id = $1 AND status = $2',
            [roleId, 'Activo']
        );
        return result.rows.map(r => r.id);
    } catch (error) {
        console.error('Error al obtener usuarios por rol:', error.message);
        return [];
    }
};

/**
 * Envía una notificación a todos los usuarios activos de un rol.
 */
const notifyRole = async (roleId, message) => {
    const userIds = await getUserIdsByRole(roleId);
    for (const userId of userIds) {
        await createNotification(userId, message);
    }
};

module.exports = { createNotification, getUserIdsByRole, notifyRole };
