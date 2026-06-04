const pool = require('../../config/db');

const InputsThermoplasticsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_thermoplastics ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_thermoplastics WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    create: async ({ reference, user_id }) => {
        const query = `
            INSERT INTO public.inputs_thermoplastics (reference, user_id) 
            VALUES ($1, $2) 
            RETURNING *`;
        const result = await pool.query(query, [reference, user_id]);
        return result.rows[0];
    },

    update: async (id, { reference }) => {
        const query = `
            UPDATE public.inputs_thermoplastics 
            SET reference = $1, update_at = CURRENT_TIMESTAMP 
            WHERE id = $2 
            RETURNING *`;
        const result = await pool.query(query, [reference, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_thermoplastics WHERE id = $1';
        await pool.query(query, [id]);
        return true;
    }
};

module.exports = InputsThermoplasticsModel;