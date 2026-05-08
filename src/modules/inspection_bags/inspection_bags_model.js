const pool = require('../../config/db');

const InspectionBagsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inspection_bags ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inspection_bags WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status } = data;
        const query = `INSERT INTO public.inspection_bags 
            (bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
        const values = [bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { height, width, art, caliber, review_date, delivery_date, observation, status } = data;
        const query = `UPDATE public.inspection_bags 
            SET height = $1, width = $2, art = $3, caliber = $4, review_date = $5, delivery_date = $6, observation = $7, status = $8 
            WHERE id = $9 RETURNING *`;
        const values = [height, width, art, caliber, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inspection_bags WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InspectionBagsModel;