const pool = require('../../config/db');

const TypeInputsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.type_inputs ORDER BY id ASC');
        return rows;
    },

    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.type_inputs WHERE id = $1', [id]);
        return rows[0];
    },

    create: async (name) => {
        const { rows } = await pool.query('INSERT INTO public.type_inputs (name) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    },

    update: async (id, name) => {
        const { rows } = await pool.query(
            'UPDATE public.type_inputs SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        return rows[0];
    },

    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.type_inputs WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = TypeInputsModel;