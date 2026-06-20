const pool = require('../../config/db');

const InspectionCasesModel = {
    findAll: async (billInputsId) => {
        if (billInputsId) {
            const { rows } = await pool.query('SELECT * FROM public.inspection_cases WHERE bill_inputs_id = $1 ORDER BY id ASC', [billInputsId]);
            return rows;
        }
        const { rows } = await pool.query('SELECT * FROM public.inspection_cases ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cases WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inspection_cases (bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'UPDATE public.inspection_cases SET bill_inputs_id = $1, users_id = $2, caliber = $3, armed = $4, review_date = $5, delivery_date = $6, observation = $7, status = $8 WHERE id = $9 RETURNING *',
            [bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_cases WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionCasesModel;