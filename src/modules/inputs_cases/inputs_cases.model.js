const pool = require('../../config/db');

const InputsCasesModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cases ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cases WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, caliber, armed } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_cases (reference, user_id, caliber, armed) VALUES ($1, $2, $3, $4) RETURNING *',
            [reference, user_id, caliber, armed]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, caliber, armed } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_cases SET reference = $1, user_id = $2, caliber = $3, armed = $4, update_at = CURRENT_DATE WHERE id = $5 RETURNING *',
            [reference, user_id, caliber, armed, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_cases WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCasesModel;