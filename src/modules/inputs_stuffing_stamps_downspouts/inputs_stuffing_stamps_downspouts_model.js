const pool = require('../../config/db');

const InputsStuffingModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_stuffing_stamps_downspouts ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_stuffing_stamps_downspouts WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, internal_diameter, external_diameter, height } = data;
        const query = `INSERT INTO public.inputs_stuffing_stamps_downspouts (reference, user_id, internal_diameter, external_diameter, height) 
                       VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, external_diameter, height]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, internal_diameter, external_diameter, height } = data;
        const query = `UPDATE public.inputs_stuffing_stamps_downspouts SET reference = $1, user_id = $2, internal_diameter = $3, external_diameter = $4, height = $5 
                       WHERE id = $6 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, internal_diameter, external_diameter, height, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_stuffing_stamps_downspouts WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsStuffingModel;