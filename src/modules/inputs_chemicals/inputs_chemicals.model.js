const pool = require('../../config/db');

const InputsChemicalsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_chemicals ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_chemicals WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, presentation, batch_date, production_test } = data;
        const { rows } = await pool.query(
            'INSERT INTO public.inputs_chemicals (reference, user_id, presentation, batch_date, production_test) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [reference, user_id, presentation, batch_date, production_test]
        );
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, user_id, presentation, batch_date, production_test } = data;
        const { rows } = await pool.query(
            'UPDATE public.inputs_chemicals SET reference = $1, user_id = $2, presentation = $3, batch_date = $4, production_test = $5, update_at = CURRENT_DATE WHERE id = $6 RETURNING *',
            [reference, user_id, presentation, batch_date, production_test, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_chemicals WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsChemicalsModel;