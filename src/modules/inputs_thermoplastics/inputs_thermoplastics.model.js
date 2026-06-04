const pool = require('../../config/db');

const InputsThermoplasticsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_thermoplastics ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_thermoplastics WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, visual } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_thermoplastics (reference, user_id, visual) VALUES ($1, $2, $3) RETURNING *',
            [reference, user_id, visual]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, visual } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_thermoplastics SET reference = $1, user_id = $2, visual = $3, update_at = CURRENT_DATE WHERE id = $4 RETURNING *',
            [reference, user_id, visual, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_thermoplastics WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsThermoplasticsModel;