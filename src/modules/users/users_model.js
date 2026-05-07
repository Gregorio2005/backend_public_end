const pool = require('../../config/db');

const UsersModel = {
    findAll: async () => {
        const query = 'SELECT id, "user", name, lastname, ci, email, roles_id, status, created_at FROM public.users ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT id, "user", name, lastname, ci, email, roles_id, status FROM public.users WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    findByUsername: async (username) => {
        const query = 'SELECT * FROM public.users WHERE "user" = $1';
        const { rows } = await pool.query(query, [username]);
        return rows[0];
    },

    create: async (userData) => {
        const { user, password, name, lastname, ci, email, roles_id, status } = userData;
        const query = `
            INSERT INTO public.users ("user", password, name, lastname, ci, email, roles_id, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, "user", name, lastname;
        `;
        const values = [user, password, name, lastname, ci, email, roles_id, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    update: async (id, userData) => {
        const { name, lastname, email, roles_id, status } = userData;
        const query = `
            UPDATE public.users 
            SET name = $1, lastname = $2, email = $3, roles_id = $4, status = $5
            WHERE id = $6
            RETURNING id, "user", name;
        `;
        const { rows } = await pool.query(query, [name, lastname, email, roles_id, status, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'UPDATE public.users SET status = \'Inactivo\' WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = UsersModel;