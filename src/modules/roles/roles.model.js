const pool = require('../../config/db');

const RolesModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.roles ORDER BY id ASC');
        return rows;
    },

    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.roles WHERE id = $1', [id]);
        return rows[0];
    },

    create: async (name) => {
        const { rows } = await pool.query('INSERT INTO public.roles (name) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    },

    update: async (id, name) => {
        const { rows } = await pool.query(
            'UPDATE public.roles SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        return rows[0];
    },

    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.roles WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = RolesModel;