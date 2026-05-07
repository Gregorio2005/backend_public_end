const pool = require('../../config/db');

const InputsCasesModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cases ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_cases WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, caliber, armed } = data;
        const query = `
            INSERT INTO public.inputs_cases (reference, user_id, caliber, armed)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [reference, user_id, caliber, armed];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, caliber, armed } = data;
        const query = `
            UPDATE public.inputs_cases 
            SET reference = $1, caliber = $2, armed = $3
            WHERE id = $4 RETURNING *`;
        const values = [reference, caliber, armed, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_cases WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsCasesModel;