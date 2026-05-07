const pool = require('../../config/db');

const InputsThermoplasticsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_thermoplastics ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.inputs_thermoplastics WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { reference, user_id, visual } = data;
        const query = `
            INSERT INTO public.inputs_thermoplastics (reference, user_id, visual)
            VALUES ($1, $2, $3) RETURNING *`;
        const values = [reference, user_id, visual];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const { reference, visual } = data;
        const query = `
            UPDATE public.inputs_thermoplastics 
            SET reference = $1, visual = $2
            WHERE id = $3 RETURNING *`;
        const values = [reference, visual, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.inputs_thermoplastics WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = InputsThermoplasticsModel;