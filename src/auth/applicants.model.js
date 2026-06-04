const pool = require('../config/db'); // Sube un nivel a src/ y luego entra a config/db

const ApplicantsModel = {
    /**
     * Obtiene todos los postulantes de la tabla 'postulantes'.
     * @returns {Promise<Array>} Un array de objetos postulantes.
     */
    findAll: async () => {
        try {
            const result = await pool.query(
                'SELECT id, name, lastname, ci, email, rol, status FROM public.postulantes ORDER BY id ASC'
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener postulantes desde la base de datos: ${error.message}`);
        }
    },

    /**
     * Inserta un nuevo postulante en la tabla.
     */
    create: async (data) => {
        const { name, lastname, ci, email, rol } = data;
        try {
            const result = await pool.query(
                'INSERT INTO public.postulantes (name, lastname, ci, email, rol, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [name, lastname, ci, email, rol, 'Inactivo']
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al insertar postulante: ${error.message}`);
        }
    },

    /**
     * Actualiza el estado de un postulante por ID.
     */
    updateStatus: async (id, status) => {
        try {
            const result = await pool.query(
                'UPDATE public.postulantes SET status = $1 WHERE id = $2 RETURNING *',
                [status, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar estado en la base de datos: ${error.message}`);
        }
    }
};

module.exports = ApplicantsModel;