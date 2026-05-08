const pool = require('../../config/db');

const InputsCasesModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_cases ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_cases WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, caliber, armed } = data;
        const query = `INSERT INTO public.inputs_cases (reference, user_id, caliber, armed) 
                       VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, caliber, armed]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, caliber, armed } = data;
        const query = `UPDATE public.inputs_cases SET reference = $1, user_id = $2, caliber = $3, armed = $4 
                       WHERE id = $5 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, caliber, armed, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_cases WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsCasesModel;