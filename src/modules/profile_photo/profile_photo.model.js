const pool = require('../../config/db');

const ProfilePhotoModel = {
    getPhotoStatus: async (userId) => {
        const { rows } = await pool.query(
            'SELECT url_perfil_photo, photo_approved FROM public.users WHERE id = $1',
            [userId]
        );
        return rows[0];
    },

    updatePhoto: async (userId, url) => {
        const { rows } = await pool.query(
            `UPDATE public.users 
             SET url_perfil_photo = $1, photo_approved = FALSE, update_at = CURRENT_DATE 
             WHERE id = $2 
             RETURNING id, url_perfil_photo, photo_approved`,
            [url, userId]
        );
        return rows[0];
    },

    approvePhoto: async (userId) => {
        const { rows } = await pool.query(
            `UPDATE public.users 
             SET photo_approved = TRUE, update_at = CURRENT_DATE 
             WHERE id = $1 
             RETURNING id, url_perfil_photo, photo_approved`,
            [userId]
        );
        return rows[0];
    },

    rejectPhoto: async (userId) => {
        const { rows } = await pool.query(
            `UPDATE public.users 
             SET url_perfil_photo = NULL, photo_approved = FALSE, update_at = CURRENT_DATE 
             WHERE id = $1 
             RETURNING id`,
            [userId]
        );
        return rows[0];
    },

    getPendingPhotos: async () => {
        const { rows } = await pool.query(
            `SELECT u.id, u.name, u.lastname, u.url_perfil_photo, u.photo_approved, u.update_at,
                    r.name AS role_name
             FROM public.users u
             LEFT JOIN public.roles r ON u.roles_id = r.id
             WHERE u.url_perfil_photo IS NOT NULL AND u.photo_approved = FALSE
             ORDER BY u.update_at DESC`
        );
        return rows;
    }
};

module.exports = ProfilePhotoModel;
