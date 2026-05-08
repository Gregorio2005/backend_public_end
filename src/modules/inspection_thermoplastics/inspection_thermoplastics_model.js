const pool = require('../../config/db');

const InspectionThermoplasticsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inspection_thermoplastics ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inspection_thermoplastics WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status } = data;
        const query = `INSERT INTO public.inspection_thermoplastics 
            (bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { visual, review_date, delivery_date, observation, status } = data;
        const query = `UPDATE public.inspection_thermoplastics 
            SET visual = $1, review_date = $2, delivery_date = $3, observation = $4, status = $5 
            WHERE id = $6 RETURNING *`;
        const values = [visual, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inspection_thermoplastics WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InspectionThermoplasticsModel;