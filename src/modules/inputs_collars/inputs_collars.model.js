const pool = require('../../config/db');

const InputsCollarsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_collars ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_collars WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, height, joint } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_collars (reference, user_id, internal_diameter, height, joint) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [reference, user_id, internal_diameter, height, joint]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, internal_diameter, height, joint } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_collars SET reference = $1, user_id = $2, internal_diameter = $3, height = $4, joint = $5, update_at = CURRENT_DATE WHERE id = $6 RETURNING *',
            [reference, user_id, internal_diameter, height, joint, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_collars WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCollarsModel;