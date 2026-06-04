const pool = require('../../config/db');

const ReportsApprovedModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.reports_approved ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.reports_approved WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_data_id, approved_quantity } = data;
        const query = `
            INSERT INTO public.reports_approved (bill_data_id, approved_quantity) 
            VALUES ($1, $2) RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, approved_quantity]);
        return rows[0];
    },

    update: async (id, data) => {
        const { bill_data_id, approved_quantity } = data;
        const query = `
            UPDATE public.reports_approved 
            SET bill_data_id = $1, approved_quantity = $2 
            WHERE id = $3 RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, approved_quantity, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.reports_approved WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = ReportsApprovedModel;