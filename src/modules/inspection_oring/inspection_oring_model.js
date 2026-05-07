const pool = require('../../config/db');

const InspectionOringModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_oring ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_oring WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, internal_diameter, height, review_date, delivery_date, observation, status } = data;
        const query = `
            INSERT INTO public.inspection_oring (bill_inputs_id, users_id, internal_diameter, height, review_date, delivery_date, observation, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const values = [bill_inputs_id, users_id, internal_diameter, height, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { internal_diameter, height, review_date, delivery_date, observation, status } = data;
        const query = `
            UPDATE public.inspection_oring 
            SET internal_diameter = $1, height = $2, review_date = $3, delivery_date = $4, observation = $5, status = $6
            WHERE id = $7 RETURNING *`;
        const values = [internal_diameter, height, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_oring WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionOringModel;