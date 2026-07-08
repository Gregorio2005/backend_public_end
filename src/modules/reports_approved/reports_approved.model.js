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

    findByBillDataId: async (billDataId) => {
        const query = 'SELECT * FROM public.reports_approved WHERE bill_data_id = $1 ORDER BY id ASC';
        const { rows } = await pool.query(query, [billDataId]);
        return rows;
    },

    incrementQuantity: async (billDataId, quantity) => {
        const query = `
            UPDATE public.reports_approved 
            SET approved_quantity = approved_quantity + $2 
            WHERE bill_data_id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [billDataId, quantity]);
        if (rows.length === 0) {
            const insertQuery = `
                INSERT INTO public.reports_approved (bill_data_id, approved_quantity) 
                VALUES ($1, $2) RETURNING *`;
            const { rows: inserted } = await pool.query(insertQuery, [billDataId, quantity]);
            return inserted[0];
        }
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.reports_approved WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = ReportsApprovedModel;