const pool = require('../../config/db');

const BillDataModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.bill_data ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.bill_data WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id } = data;
        const query = `
            INSERT INTO public.bill_data (bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, data) => {
        const { bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id } = data;
        const query = `
            UPDATE public.bill_data 
            SET bill_nro = $1, billing_date = $2, odoo = $3, nro_exp = $4, nro_reception = $5, receipt_date = $6, suppliers_id = $7 
            WHERE id = $8 RETURNING *`;
        const values = [bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.bill_data WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = BillDataModel;