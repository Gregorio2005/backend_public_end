const pool = require('../../config/db');

const InputsBagsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_bags ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_bags WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { reference, user_id, height, width, art, caliber } = data;
        const query = `INSERT INTO public.inputs_bags (reference, user_id, height, width, art, caliber) 
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, height, width, art, caliber]);
        return rows[0];
    },

    update: async (id, data) => {
        const { reference, user_id, height, width, art, caliber } = data;
        const query = `UPDATE public.inputs_bags SET reference = $1, user_id = $2, height = $3, width = $4, art = $5, caliber = $6 
                       WHERE id = $7 RETURNING *`;
        const { rows } = await pool.query(query, [reference, user_id, height, width, art, caliber, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_bags WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = InputsBagsModel;