const pool = require('../../config/db');

const InputsCollarsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_collars ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_collars WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, height, joint } = data;
        const query = `
            INSERT INTO public.inputs_collars (reference, user_id, internal_diameter, height, joint)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [reference, user_id, internal_diameter, height, joint];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, internal_diameter, height, joint } = data;
        const query = `
            UPDATE public.inputs_collars 
            SET reference = $1, internal_diameter = $2, height = $3, joint = $4
            WHERE id = $5 RETURNING *`;
        const values = [reference, internal_diameter, height, joint, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_collars WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCollarsModel;