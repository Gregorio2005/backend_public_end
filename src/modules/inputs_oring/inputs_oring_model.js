const pool = require('../../config/db');

const InputsOringModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_oring ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_oring WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, height } = data;
        const query = `
            INSERT INTO public.inputs_oring (reference, user_id, internal_diameter, height)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [reference, user_id, internal_diameter, height];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, internal_diameter, height } = data;
        const query = `
            UPDATE public.inputs_oring 
            SET reference = $1, internal_diameter = $2, height = $3
            WHERE id = $4 RETURNING *`;
        const values = [reference, internal_diameter, height, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_oring WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsOringModel;