const pool = require('../../config/db');

const InputsStampsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stamps ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_stamps WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, internal_diameter, external_diameter, height_a, height_b } = data;
        const query = `
            INSERT INTO public.inputs_stamps (reference, user_id, internal_diameter, external_diameter, height_a, height_b)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [reference, user_id, internal_diameter, external_diameter, height_a, height_b];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, internal_diameter, external_diameter, height_a, height_b } = data;
        const query = `
            UPDATE public.inputs_stamps 
            SET reference = $1, internal_diameter = $2, external_diameter = $3, height_a = $4, height_b = $5
            WHERE id = $6 RETURNING *`;
        const values = [reference, internal_diameter, external_diameter, height_a, height_b, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_stamps WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsStampsModel;