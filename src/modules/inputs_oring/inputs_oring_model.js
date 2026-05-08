const pool = require('../../config/db');

const InputsOringModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_oring ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_oring WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, internal_diameter, height } = data;
        const query = `INSERT INTO public.inputs_oring (reference, user_id, internal_diameter, height) 
                       VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, height]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, internal_diameter, height } = data;
        const query = `UPDATE public.inputs_oring SET reference = $1, user_id = $2, internal_diameter = $3, height = $4 
                       WHERE id = $5 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, height, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_oring WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsOringModel;