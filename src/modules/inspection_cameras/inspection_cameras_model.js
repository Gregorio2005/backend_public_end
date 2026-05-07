const pool = require('../../config/db');

const InspectionCamerasModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cameras ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cameras WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status } = data;
        const query = `
            INSERT INTO public.inspection_cameras (bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
        const values = [bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status } = data;
        const query = `
            UPDATE public.inspection_cameras 
            SET thickness_a = $1, thickness_b = $2, thickness_c = $3, thickness_d = $4, ring_diameter_a = $5, ring_diameter_b = $6, ring_diameter_c = $7, ring_diameter_d = $8, review_date = $9, delivery_date = $10, observation = $11, status = $12
            WHERE id = $13 RETURNING *`;
        const values = [thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_cameras WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionCamerasModel;