const pool = require('../../config/db');

const TypeInputsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.type_inputs ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.type_inputs WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (name) => {
        const query = 'INSERT INTO public.type_inputs (name) VALUES ($1) RETURNING *';
        const { rows } = await pool.query(query, [name]);
        return rows[0];
    },

    update: async (id, name) => {
        const query = 'UPDATE public.type_inputs SET name = $1 WHERE id = $2 RETURNING *';
        const { rows } = await pool.query(query, [name, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.type_inputs WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = TypeInputsModel;