const pool = require('../../config/db');

const InspectionCasesModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cases ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cases WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status } = data;
        const query = `
            INSERT INTO public.inspection_cases (bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const values = [bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { caliber, armed, review_date, delivery_date, observation, status } = data;
        const query = `
            UPDATE public.inspection_cases 
            SET caliber = $1, armed = $2, review_date = $3, delivery_date = $4, observation = $5, status = $6
            WHERE id = $7 RETURNING *`;
        const values = [caliber, armed, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_cases WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionCasesModel;