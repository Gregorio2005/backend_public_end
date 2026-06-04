const pool = require('../../config/db');

const InputsCollarsModel = {
    findAll: async () => {
        const query = 'SELECT * FROM public.inputs_collars ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.inputs_collars WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    create: async ({ reference, user_id, internal_diameter, height }) => {
        const query = `
            INSERT INTO public.inputs_collars (reference, user_id, internal_diameter, height) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;
        const result = await pool.query(query, [reference, user_id, internal_diameter, height]);
        return result.rows[0];
    },

    update: async (id, { reference, user_id, internal_diameter, height }) => {
        const query = `
            UPDATE public.inputs_collars 
            SET reference = $1, user_id = $2, internal_diameter = $3, height = $4, update_at = CURRENT_TIMESTAMP 
            WHERE id = $5 
            RETURNING *`;
        const result = await pool.query(query, [reference, user_id, internal_diameter, height, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.inputs_collars WHERE id = $1';
        await pool.query(query, [id]);
        return true;
    }
};

module.exports = InputsCollarsModel;