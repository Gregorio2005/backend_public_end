const pool = require('../../config/db');

const InputsOringModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_oring ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_oring WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, height } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_oring (reference, user_id, internal_diameter, height) VALUES ($1, $2, $3, $4) RETURNING *',
            [reference, user_id, internal_diameter, height]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, internal_diameter, height } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_oring SET reference = $1, user_id = $2, internal_diameter = $3, height = $4, update_at = CURRENT_DATE WHERE id = $5 RETURNING *',
            [reference, user_id, internal_diameter, height, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_oring WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsOringModel;