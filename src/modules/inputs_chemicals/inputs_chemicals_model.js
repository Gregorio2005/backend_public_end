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
        const query = `
            INSERT INTO public.inputs_chemicals (reference, user_id, presentation, batch_date, production_test)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [reference, user_id, presentation, batch_date, production_test];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, presentation, batch_date, production_test } = data;
        const query = `
            UPDATE public.inputs_chemicals 
            SET reference = $1, presentation = $2, batch_date = $3, production_test = $4
            WHERE id = $5 RETURNING *`;
        const values = [reference, presentation, batch_date, production_test, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_chemicals WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsChemicalsModel;