const pool = require('../../config/db');

const SuppliersModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.suppliers ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.suppliers WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { user_id, name } = data;
        const query = 'INSERT INTO public.suppliers (user_id, name) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [user_id, name]);
        return rows[0];
    },

    update: async (id, data) => {
        const { user_id, name } = data;
        const query = `
            UPDATE public.suppliers 
            SET user_id = $1, name = $2 
            WHERE id = $3 
            RETURNING *
        `;
        const { rows } = await pool.query(query, [user_id, name, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.suppliers WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = SuppliersModel;