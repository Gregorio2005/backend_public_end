const pool = require('../../config/db');

const InspectionStampsModel = {
    findAll: async (billInputsId) => {
        if (billInputsId) {
            const { rows } = await pool.query('SELECT * FROM public.inspection_stamps WHERE bill_inputs_id = $1 ORDER BY id ASC', [billInputsId]);
            return rows;
        }
        const { rows } = await pool.query('SELECT * FROM public.inspection_stamps ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_stamps WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inspection_stamps (bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'UPDATE public.inspection_stamps SET bill_inputs_id = $1, users_id = $2, internal_diameter = $3, external_diameter = $4, height_a = $5, height_b = $6, review_date = $7, delivery_date = $8, observation = $9, status = $10 WHERE id = $11 RETURNING *',
            [bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_stamps WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionStampsModel;