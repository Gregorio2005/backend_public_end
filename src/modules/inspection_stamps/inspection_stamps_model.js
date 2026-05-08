const pool = require('../../config/db');

const InspectionStampsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inspection_stamps ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inspection_stamps WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status } = data;
        const query = `INSERT INTO public.inspection_stamps 
            (bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
        const values = [bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status } = data;
        const query = `UPDATE public.inspection_stamps 
            SET internal_diameter = $1, external_diameter = $2, height_a = $3, height_b = $4, review_date = $5, delivery_date = $6, observation = $7, status = $8 
            WHERE id = $9 RETURNING *`;
        const values = [internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inspection_stamps WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InspectionStampsModel;