const pool = require('../../config/db');

const InputsBagsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_bags ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_bags WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, height, width, art, caliber } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_bags (reference, user_id, height, width, art, caliber) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [reference, user_id, height, width, art, caliber]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, height, width, art, caliber } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_bags SET reference = $1, user_id = $2, height = $3, width = $4, art = $5, caliber = $6, update_at = CURRENT_DATE WHERE id = $7 RETURNING *',
            [reference, user_id, height, width, art, caliber, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_bags WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsBagsModel;