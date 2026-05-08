const pool = require('../../config/db');

const InputsStampsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_stamps ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_stamps WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, internal_diameter, external_diameter, height_a, height_b } = data;
        const query = `INSERT INTO public.inputs_stamps (reference, user_id, internal_diameter, external_diameter, height_a, height_b) 
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, external_diameter, height_a, height_b]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, internal_diameter, external_diameter, height_a, height_b } = data;
        const query = `UPDATE public.inputs_stamps 
                       SET reference = $1, user_id = $2, internal_diameter = $3, external_diameter = $4, height_a = $5, height_b = $6 
                       WHERE id = $7 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, external_diameter, height_a, height_b, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_stamps WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsStampsModel;