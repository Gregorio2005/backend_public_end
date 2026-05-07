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
        const query = `
            INSERT INTO public.inputs_bags (reference, user_id, height, width, art, caliber)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [reference, user_id, height, width, art, caliber];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, height, width, art, caliber } = data;
        const query = `
            UPDATE public.inputs_bags 
            SET reference = $1, height = $2, width = $3, art = $4, caliber = $5
            WHERE id = $6 RETURNING *`;
        const values = [reference, height, width, art, caliber, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_bags WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsBagsModel;