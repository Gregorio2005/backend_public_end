const pool = require('../../config/db');

const InspectionChemicalsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inspection_chemicals ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inspection_chemicals WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status } = data;
        const query = `INSERT INTO public.inspection_chemicals 
            (bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const values = [bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { presentation, batch_date, production_test, review_date, delivery_date, observation, status } = data;
        const query = `UPDATE public.inspection_chemicals 
            SET presentation = $1, batch_date = $2, production_test = $3, review_date = $4, delivery_date = $5, observation = $6, status = $7 
            WHERE id = $8 RETURNING *`;
        const values = [presentation, batch_date, production_test, review_date, delivery_date, observation, status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inspection_chemicals WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InspectionChemicalsModel;