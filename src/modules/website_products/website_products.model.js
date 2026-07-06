const pool = require('../../config/db');

const WebsiteProductsModel = {
    findActive: async () => {
        const query = 'SELECT * FROM public.website_products WHERE status = $1 ORDER BY display_order ASC';
        const { rows } = await pool.query(query, ['Activo']);
        return rows;
    },

    findAll: async () => {
        const query = 'SELECT * FROM public.website_products ORDER BY display_order ASC';
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.website_products WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { name, description, image_url, display_order, status } = data;
        const query = `
            INSERT INTO public.website_products (name, description, image_url, display_order, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const { rows } = await pool.query(query, [name, description, image_url, display_order, status]);
        return rows[0];
    },

    update: async (id, data) => {
        const { name, description, image_url, display_order, status } = data;
        const query = `
            UPDATE public.website_products
            SET name = $1, description = $2, image_url = $3, display_order = $4, status = $5, update_at = NOW()
            WHERE id = $6
            RETURNING *`;
        const { rows } = await pool.query(query, [name, description, image_url, display_order, status, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.website_products WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    count: async () => {
        const query = 'SELECT COUNT(*)::int AS total FROM public.website_products';
        const { rows } = await pool.query(query);
        return rows[0].total;
    }
};

module.exports = WebsiteProductsModel;
