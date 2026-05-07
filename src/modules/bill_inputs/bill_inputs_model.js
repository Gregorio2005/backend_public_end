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
    findByBillId: async (billDataId) => {
        const { rows } = await pool.query('SELECT * FROM public.bill_inputs WHERE bill_data_id = $1', [billDataId]);
        return rows;
    },
    create: async (data) => {
        const { bill_data_id, master_inputs_id, oem_number, quantity } = data;
        const query = `
            INSERT INTO public.bill_inputs (bill_data_id, master_inputs_id, oem_number, quantity)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [bill_data_id, master_inputs_id, oem_number, quantity];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { oem_number, quantity } = data;
        const { rows } = await pool.query(
            'UPDATE public.bill_inputs SET oem_number = $1, quantity = $2 WHERE id = $3 RETURNING *',
            [oem_number, quantity, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.bill_inputs WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = BillInputsModel;