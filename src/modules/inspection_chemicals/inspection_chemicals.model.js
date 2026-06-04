const pool = require('../../config/db');

const InspectionChemicalsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_chemicals ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_chemicals WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inspection_chemicals (bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'UPDATE public.inspection_chemicals SET bill_inputs_id = $1, users_id = $2, presentation = $3, batch_date = $4, production_test = $5, review_date = $6, delivery_date = $7, observation = $8, status = $9 WHERE id = $10 RETURNING *',
            [bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_chemicals WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionChemicalsModel;