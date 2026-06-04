const pool = require('../config/db');

const WebsiteNoticeModel = {
    /**
     * Inserta un nuevo aviso en la tabla 'mensajes_web'.
     * @param {string} name - El nombre del aviso.
     * @param {string} note - El contenido del aviso.
     * @returns {Promise<Object>} El aviso creado.
     */
    create: async (name, note) => {
        try {
            const result = await pool.query(
                'INSERT INTO public.mensajes_web (name, note) VALUES ($1, $2) RETURNING id, name, note',
                [name, note]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al insertar el aviso web: ${error.message}`);
        }
    },

    /**
     * Obtiene todos los avisos de la tabla 'mensajes_web'.
     * @returns {Promise<Array>} Lista de avisos.
     */
    getAll: async () => {
        try {
            const result = await pool.query(
                'SELECT id, name, note FROM public.mensajes_web ORDER BY id DESC'
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener los avisos web: ${error.message}`);
        }
    }
};

module.exports = WebsiteNoticeModel;