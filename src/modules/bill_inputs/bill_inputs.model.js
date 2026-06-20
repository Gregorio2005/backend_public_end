const pool = require('../../config/db');

const BillInputsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.bill_inputs ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.bill_inputs WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { bill_data_id, master_inputs_id, oem_number, quantity, quantity_inspection, percentage } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.bill_inputs (bill_data_id, master_inputs_id, oem_number, quantity, quantity_inspection, percentage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [bill_data_id, master_inputs_id, oem_number, quantity, quantity_inspection, percentage]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { bill_data_id, master_inputs_id, oem_number, quantity, quantity_inspection, percentage } = data;
        const { rows } = await pool.query(
            'UPDATE public.bill_inputs SET bill_data_id = $1, master_inputs_id = $2, oem_number = $3, quantity = $4, quantity_inspection = $5, percentage = $6 WHERE id = $7 RETURNING *',
            [bill_data_id, master_inputs_id, oem_number, quantity, quantity_inspection, percentage, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.bill_inputs WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = BillInputsModel;