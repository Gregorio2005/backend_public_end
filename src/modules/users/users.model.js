const pool = require('../../config/db');
const { paginate } = require('../../utils/pagination');

const BASE_SELECT = 'SELECT id, "user", name, lastname, ci, email, roles_id, status, created_at FROM public.users';

const UsersModel = {
    findAll: async ({ page, limit, search, roles_id, status, sort, sortDir } = {}) => {
        const conditions = [];
        const params = [];

        if (search) {
            params.push(`%${search}%`);
            const idx = params.length;
            conditions.push(`(
                name ILIKE $${idx} OR 
                lastname ILIKE $${idx} OR 
                "user" ILIKE $${idx} OR 
                email ILIKE $${idx}
            )`);
        }

        if (roles_id) {
            const ids = roles_id.split(',').map(Number).filter(n => !isNaN(n));
            if (ids.length > 0) {
                params.push(ids);
                conditions.push(`roles_id = ANY($${params.length}::int[])`);
            }
        }

        if (status) {
            const statuses = status.split(',').filter(Boolean);
            if (statuses.length > 0) {
                params.push(statuses);
                conditions.push(`status = ANY($${params.length}::text[])`);
            }
        }

        let query = BASE_SELECT;
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const allowedSorts = ['name', 'lastname', 'user', 'roles_id', 'status'];
        if (allowedSorts.includes(sort)) {
            const dir = sortDir === 'desc' ? 'DESC' : 'ASC';
            const col = sort === 'user' ? `"${sort}"` : `"${sort}"`;

            query += ` ORDER BY
                CASE
                    WHEN ${col}::text ~ '^[a-zA-Z]' THEN 1
                    WHEN ${col}::text ~ '^[0-9]' THEN 2
                    ELSE 3
                END ASC,
                ${col} ${dir},
                id ${dir}`;
        } else {
            query += ` ORDER BY roles_id ASC, id ASC`;
        }

        return await paginate(query, params, { page, limit });
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