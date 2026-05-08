const pool = require('../../config/db');

const InputsCollarsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_collars ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_collars WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, internal_diameter, height, joint } = data;
        const query = `INSERT INTO public.inputs_collars (reference, user_id, internal_diameter, height, joint) 
                       VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, height, joint]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, internal_diameter, height, joint } = data;
        const query = `UPDATE public.inputs_collars SET reference = $1, user_id = $2, internal_diameter = $3, height = $4, joint = $5 
                       WHERE id = $6 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, height, joint, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_collars WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsCollarsModel;