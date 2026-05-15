const pool = require('../../config/db');

const MasterInputsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.master_inputs ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.master_inputs WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { inputs_id, type_inputs_id, status } = data;
        const query = `
            INSERT INTO public.master_inputs (inputs_id, type_inputs_id, status)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const { rows } = await pool.query(query, [inputs_id, type_inputs_id, status]);
        return rows[0];
    },

    update: async (id, data) => {
        const { inputs_id, type_inputs_id, status } = data;
        const query = `
            UPDATE public.master_inputs
            SET inputs_id = $1, type_inputs_id = $2, status = $3, update_at = CURRENT_DATE
            WHERE id = $4
            RETURNING *`;
        const { rows } = await pool.query(query, [inputs_id, type_inputs_id, status, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.master_inputs WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = MasterInputsModel;