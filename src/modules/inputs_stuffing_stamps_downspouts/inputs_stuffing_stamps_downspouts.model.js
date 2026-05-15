const pool = require('../../config/db');

const InputsStuffingStampsDownspoutsModel = {
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
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_stuffing_stamps_downspouts (reference, user_id, internal_diameter, external_diameter, height) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [reference, user_id, internal_diameter, external_diameter, height]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, internal_diameter, external_diameter, height } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_stuffing_stamps_downspouts SET reference = $1, user_id = $2, internal_diameter = $3, external_diameter = $4, height = $5, update_at = CURRENT_DATE WHERE id = $6 RETURNING *',
            [reference, user_id, internal_diameter, external_diameter, height, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_stuffing_stamps_downspouts WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsStuffingStampsDownspoutsModel;