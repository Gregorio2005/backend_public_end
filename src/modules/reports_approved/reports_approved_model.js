const pool = require('../../config/db');

const ReportsApprovedModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.reports_approved ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.reports_approved WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_data_id, approved_quantity } = data;
        const query = `
            INSERT INTO public.reports_approved (bill_data_id, approved_quantity)
            VALUES ($1, $2) RETURNING *`;
        const values = [bill_data_id, approved_quantity];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { approved_quantity } = data;
        const query = `
            UPDATE public.reports_approved 
            SET approved_quantity = $1
            WHERE id = $2 RETURNING *`;
        const values = [approved_quantity, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.reports_approved WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = ReportsApprovedModel;