const pool = require('../../config/db');

const InputsCardboardModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cardboard ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cardboard WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, height, width, caliber } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_cardboard (reference, user_id, height, width, caliber) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [reference, user_id, height, width, caliber]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, height, width, caliber } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_cardboard SET reference = $1, user_id = $2, height = $3, width = $4, caliber = $5, update_at = CURRENT_DATE WHERE id = $6 RETURNING *',
            [reference, user_id, height, width, caliber, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_cardboard WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCardboardModel;