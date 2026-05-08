const pool = require('../../config/db');

const BillInputsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.bill_inputs ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.bill_inputs WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { bill_data_id, master_inputs_id, oem_number, quantity } = data;
        const query = `
            INSERT INTO public.bill_inputs (bill_data_id, master_inputs_id, oem_number, quantity) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, master_inputs_id, oem_number, quantity]);
        return rows[0];
    },

    update: async (id, data) => {
        const { bill_data_id, master_inputs_id, oem_number, quantity } = data;
        const query = `
            UPDATE public.bill_inputs 
            SET bill_data_id = $1, master_inputs_id = $2, oem_number = $3, quantity = $4 
            WHERE id = $5 RETURNING *`;
        const { rows } = await pool.query(query, [bill_data_id, master_inputs_id, oem_number, quantity, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.bill_inputs WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = BillInputsModel;