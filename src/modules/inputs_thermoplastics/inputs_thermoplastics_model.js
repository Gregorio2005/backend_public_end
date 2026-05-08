const pool = require('../../config/db');

const InputsThermoplasticsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_thermoplastics ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_thermoplastics WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, visual } = data;
        const query = `INSERT INTO public.inputs_thermoplastics (reference, user_id, visual) 
                       VALUES ($1, $2, $3) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, visual]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, visual } = data;
        const query = `UPDATE public.inputs_thermoplastics SET reference = $1, user_id = $2, visual = $3 
                       WHERE id = $4 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, visual, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_thermoplastics WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsThermoplasticsModel;