const pool = require('../../config/db');

const RolesModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.roles ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.roles WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (name) => {
        const query = 'INSERT INTO public.roles (name) VALUES ($1) RETURNING *';
        const { rows } = await pool.query(query, [name]);
        return rows[0];
    },

    update: async (id, name) => {
        const query = 'UPDATE public.roles SET name = $1 WHERE id = $2 RETURNING *';
        const { rows } = await pool.query(query, [name, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.roles WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = RolesModel;