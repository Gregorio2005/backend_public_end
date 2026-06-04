const pool = require('../../config/db');

const InspectionBagsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_bags ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_bags WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inspection_bags (bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'UPDATE public.inspection_bags SET bill_inputs_id = $1, users_id = $2, height = $3, width = $4, art = $5, caliber = $6, review_date = $7, delivery_date = $8, observation = $9, status = $10 WHERE id = $11 RETURNING *',
            [bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_bags WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionBagsModel;