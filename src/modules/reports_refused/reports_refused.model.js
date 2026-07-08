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

    findByBillDataId: async (billDataId) => {
        const query = 'SELECT * FROM public.reports_refused WHERE bill_data_id = $1 ORDER BY id ASC';
        const { rows } = await pool.query(query, [billDataId]);
        return rows;
    },

    incrementQuantity: async (billDataId, quantity, rejectionReason = null) => {
        const query = `
            UPDATE public.reports_refused 
            SET claim_quantity = claim_quantity + $2 
            WHERE bill_data_id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [billDataId, quantity]);
        if (rows.length === 0) {
            const insertQuery = `
                INSERT INTO public.reports_refused (bill_data_id, claim_date, claim_quantity, rejection_reason) 
                VALUES ($1, NOW(), $2, $3) RETURNING *`;
            const { rows: inserted } = await pool.query(insertQuery, [billDataId, quantity, rejectionReason]);
            return inserted[0];
        }
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.reports_refused WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = ReportsRefusedModel;