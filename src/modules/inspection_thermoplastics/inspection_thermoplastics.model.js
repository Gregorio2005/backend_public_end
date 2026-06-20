const pool = require('../../config/db');

const InspectionThermoplasticsModel = {
    findAll: async (billInputsId) => {
        if (billInputsId) {
            const { rows } = await pool.query('SELECT * FROM public.inspection_thermoplastics WHERE bill_inputs_id = $1 ORDER BY id ASC', [billInputsId]);
            return rows;
        }
        const { rows } = await pool.query('SELECT * FROM public.inspection_thermoplastics ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_thermoplastics WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inspection_thermoplastics (bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            'UPDATE public.inspection_thermoplastics SET bill_inputs_id = $1, users_id = $2, visual = $3, review_date = $4, delivery_date = $5, observation = $6, status = $7 WHERE id = $8 RETURNING *',
            [bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_thermoplastics WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionThermoplasticsModel;