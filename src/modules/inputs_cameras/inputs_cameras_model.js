const pool = require('../../config/db');

const InputsCamerasModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_cameras ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_cameras WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d } = data;
        const query = `INSERT INTO public.inputs_cameras 
                       (reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
        const values = [reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d } = data;
        const query = `UPDATE public.inputs_cameras SET reference = $1, user_id = $2, thickness_a = $3, thickness_b = $4, thickness_c = $5, thickness_d = $6, 
                       ring_diameter_a = $7, ring_diameter_b = $8, ring_diameter_c = $9, ring_diameter_d = $10 
                       WHERE id = $11 RETURNING *`;
        const values = [reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_cameras WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsCamerasModel;