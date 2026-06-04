const pool = require('../../config/db');

const InputsStampsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stamps ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stamps WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, external_diameter, height_a, height_b } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_stamps (reference, user_id, internal_diameter, external_diameter, height_a, height_b) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [reference, user_id, internal_diameter, external_diameter, height_a, height_b]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, internal_diameter, external_diameter, height_a, height_b } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_stamps SET reference = $1, user_id = $2, internal_diameter = $3, external_diameter = $4, height_a = $5, height_b = $6, update_at = CURRENT_DATE WHERE id = $7 RETURNING *',
            [reference, user_id, internal_diameter, external_diameter, height_a, height_b, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_stamps WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsStampsModel;