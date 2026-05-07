const pool = require('../../config/db');

const InspectionStuffingModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_stuffing_stamps_downspouts ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_stuffing_stamps_downspouts WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status } = data;
        const query = `
            INSERT INTO public.inspection_stuffing_stamps_downspouts (bill_inputs_id, users_id, dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const values = [bill_inputs_id, users_id, dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status } = data;
        const query = `
            UPDATE public.inspection_stuffing_stamps_downspouts 
            SET dinternal_diameter = $1, external_diameter = $2, height = $3, review_date = $4, delivery_date = $5, observation = $6, status = $7
            WHERE id = $8 RETURNING *`;
        const values = [dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_stuffing_stamps_downspouts WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionStuffingModel;