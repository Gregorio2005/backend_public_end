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
        const query = `
            INSERT INTO public.inputs_cardboard (reference, user_id, height, width, caliber)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [reference, user_id, height, width, caliber];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, height, width, caliber } = data;
        const query = `
            UPDATE public.inputs_cardboard 
            SET reference = $1, height = $2, width = $3, caliber = $4
            WHERE id = $5 RETURNING *`;
        const values = [reference, height, width, caliber, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_cardboard WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCardboardModel;