const pool = require('../../config/db');

const InputsChemicalsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_chemicals ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_chemicals WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, presentation, batch_date, production_test } = data;
        const query = `INSERT INTO public.inputs_chemicals (reference, user_id, presentation, batch_date, production_test) 
                       VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, presentation, batch_date, production_test]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, presentation, batch_date, production_test } = data;
        const query = `UPDATE public.inputs_chemicals SET reference = $1, user_id = $2, presentation = $3, batch_date = $4, production_test = $5 
                       WHERE id = $6 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, presentation, batch_date, production_test, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_chemicals WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsChemicalsModel;