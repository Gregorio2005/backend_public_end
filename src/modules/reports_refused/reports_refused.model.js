const pool = require('../../config/db');

const ReportsRefusedModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.reports_refused ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.reports_refused WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_data_id, claim_date, claim_quantity, rejection_reason } = data;
        const query = `
            INSERT INTO public.reports_refused (bill_data_id, claim_date, claim_quantity, rejection_reason) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, claim_date, claim_quantity, rejection_reason]);
        return rows[0];
    },

    update: async (id, data) => {
        const { bill_data_id, claim_date, claim_quantity, rejection_reason } = data;
        const query = `
            UPDATE public.reports_refused 
            SET bill_data_id = $1, claim_date = $2, claim_quantity = $3, rejection_reason = $4 
            WHERE id = $5 RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, claim_date, claim_quantity, rejection_reason, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.reports_refused WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = ReportsRefusedModel;