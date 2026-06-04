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
        const { user, name, lastname, ci, email, roles_id, status } = userData;
        const query = `
            UPDATE public.users 
            SET "user" = COALESCE($1, "user"), 
                name = COALESCE($2, name), 
                lastname = COALESCE($3, lastname), 
                ci = COALESCE($4, ci), 
                email = COALESCE($5, email), 
                roles_id = COALESCE($6, roles_id), 
                status = COALESCE($7, status),
                update_at = CURRENT_DATE
            WHERE id = $8
            RETURNING id, "user", name, lastname, ci, email, roles_id, status;
        `;
        const values = [
            user !== undefined ? user : null,
            name !== undefined ? name : null,
            lastname !== undefined ? lastname : null,
            ci !== undefined ? ci : null,
            email !== undefined ? email : null,
            roles_id !== undefined ? roles_id : null,
            status !== undefined ? status : null,
            id
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'UPDATE public.users SET status = \'Inactivo\' WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = UsersModel;