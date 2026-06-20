const pool = require('../../config/db');

const InspectionCamerasModel = {
    findAll: async (billInputsId) => {
        if (billInputsId) {
            const { rows } = await pool.query('SELECT * FROM public.inspection_cameras WHERE bill_inputs_id = $1 ORDER BY id ASC', [billInputsId]);
            return rows;
        }
        const { rows } = await pool.query('SELECT * FROM public.inspection_cameras ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inspection_cameras WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            `INSERT INTO public.inspection_cameras 
            (bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status } = data;
        const { rows } = await pool.query(
            `UPDATE public.inspection_cameras 
            SET bill_inputs_id = $1, users_id = $2, thickness_a = $3, thickness_b = $4, thickness_c = $5, thickness_d = $6, 
                ring_diameter_a = $7, ring_diameter_b = $8, ring_diameter_c = $9, ring_diameter_d = $10, 
                review_date = $11, delivery_date = $12, observation = $13, status = $14 
            WHERE id = $15 RETURNING *`,
            [bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inspection_cameras WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InspectionCamerasModel;