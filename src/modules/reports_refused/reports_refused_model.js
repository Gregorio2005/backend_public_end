const pool = require('../../config/db');

const ReportsRefusedModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.reports_refused ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.reports_refused WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_data_id, claim_date, claim_quantity, rejection_reason } = data;
        const query = `
            INSERT INTO public.reports_refused (bill_data_id, claim_date, claim_quantity, rejection_reason)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [bill_data_id, claim_date, claim_quantity, rejection_reason];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { claim_date, claim_quantity, rejection_reason } = data;
        const query = `
            UPDATE public.reports_refused 
            SET claim_date = $1, claim_quantity = $2, rejection_reason = $3
            WHERE id = $4 RETURNING *`;
        const values = [claim_date, claim_quantity, rejection_reason, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.reports_refused WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = ReportsRefusedModel;