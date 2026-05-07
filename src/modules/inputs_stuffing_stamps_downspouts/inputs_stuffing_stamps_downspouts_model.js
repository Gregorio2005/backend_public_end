const pool = require('../../config/db');

const InputsStuffingModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stuffing_stamps_downspouts ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stuffing_stamps_downspouts WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, external_diameter, height } = data;
        const query = `
            INSERT INTO public.inputs_stuffing_stamps_downspouts (reference, user_id, internal_diameter, external_diameter, height)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [reference, user_id, internal_diameter, external_diameter, height];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, internal_diameter, external_diameter, height } = data;
        const query = `
            UPDATE public.inputs_stuffing_stamps_downspouts 
            SET reference = $1, internal_diameter = $2, external_diameter = $3, height = $4
            WHERE id = $5 RETURNING *`;
        const values = [reference, internal_diameter, external_diameter, height, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_stuffing_stamps_downspouts WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsStuffingModel;