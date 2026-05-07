const pool = require('../../config/db');

const MasterInputsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.master_inputs ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.master_inputs WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { inputs_id, type_inputs_id, status } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.master_inputs (inputs_id, type_inputs_id, status) VALUES ($1, $2, $3) RETURNING *',
            [inputs_id, type_inputs_id, status]
        );
        return rows[0];
    },
    updateStatus: async (id, status) => {
        const { rows } = await pool.query(
            'UPDATE public.master_inputs SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.master_inputs WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = MasterInputsModel;