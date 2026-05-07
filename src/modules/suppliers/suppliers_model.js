const pool = require('../../config/db');

const SuppliersModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.suppliers ORDER BY id ASC');
        return rows;
    },
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.suppliers WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (supplierData) => {
        const { user_id, name } = supplierData;
        const { rows } = await pool.query(
            'INSERT INTO public.suppliers (user_id, name) VALUES ($1, $2) RETURNING *',
            [user_id, name]
        );
        return rows[0];
    },
    update: async (id, name) => {
        const { rows } = await pool.query(
            'UPDATE public.suppliers SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.suppliers WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    }
};

module.exports = SuppliersModel;