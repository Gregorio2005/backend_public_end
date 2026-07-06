const pool = require('../config/db');
const { paginate } = require('../utils/pagination');

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
    getAll: async (params = {}) => {
        try {
            return await paginate(
                'SELECT id, name, note, status FROM public.mensajes_web ORDER BY status DESC, id DESC',
                [],
                params
            );
        } catch (error) {
            throw new Error(`Error al obtener los avisos web: ${error.message}`);
        }
    },

    /**
     * Activa un aviso específico y desactiva todos los demás.
     * @param {number|string} id - El ID del aviso a publicar.
     */
    setActive: async (id) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Ponemos todos los mensajes en false
            await client.query('UPDATE public.mensajes_web SET status = FALSE');
            // Activamos el mensaje seleccionado
            const result = await client.query(
                'UPDATE public.mensajes_web SET status = TRUE WHERE id = $1 RETURNING *',
                [id]
            );
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(`Error al activar el aviso web: ${error.message}`);
        } finally {
            client.release();
        }
    },

    /**
     * Obtiene un aviso específico por su ID.
     * @param {number|string} id - El ID del aviso a buscar.
     * @returns {Promise<Object>} El aviso encontrado.
     */
    getById: async (id) => {
        try {
            const result = await pool.query(
                'SELECT id, name, note FROM public.mensajes_web WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al obtener el aviso web por ID: ${error.message}`);
        }
    }
};

module.exports = WebsiteNoticeModel;