const pool = require('../config/db');

const ApplicantsModel = {
    /**
     * Obtiene todos los postulantes con todas sus columnas.
     */
    findAll: async () => {
        try {
            const result = await pool.query(
                `SELECT id, name, lastname, ci, email, phone, birth_date, rol, cv_path,
                        status, interview_formal_date, interview_formal_result,
                        interview_medical_date, interview_medical_result, created_at
                 FROM public.postulantes ORDER BY id ASC`
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener postulantes desde la base de datos: ${error.message}`);
        }
    },

    /**
     * Obtiene un postulante por ID.
     */
    findById: async (id) => {
        try {
            const result = await pool.query(
                `SELECT id, name, lastname, ci, email, phone, birth_date, rol, cv_path,
                        status, interview_formal_date, interview_formal_result,
                        interview_medical_date, interview_medical_result, created_at
                 FROM public.postulantes WHERE id = $1`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al obtener postulante: ${error.message}`);
        }
    },

    /**
     * Inserta un nuevo postulante con los campos expandidos.
     */
    create: async (data) => {
        const { name, lastname, ci, email, phone, birth_date, rol, cv_path } = data;
        try {
            const result = await pool.query(
                `INSERT INTO public.postulantes
                    (name, lastname, ci, email, phone, birth_date, rol, cv_path, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING *`,
                [name, lastname, ci, email, phone || null, birth_date || null, rol, cv_path || null, 'En revision']
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al insertar postulante: ${error.message}`);
        }
    },

    /**
     * Actualiza toda la información del postulante (para el admin).
     */
    updateFull: async (id, data) => {
        const { status, interview_formal_date, interview_formal_result,
                interview_medical_date, interview_medical_result } = data;
        try {
            const result = await pool.query(
                `UPDATE public.postulantes
                 SET status = $1,
                     interview_formal_date = $2,
                     interview_formal_result = $3,
                     interview_medical_date = $4,
                     interview_medical_result = $5
                 WHERE id = $6 RETURNING *`,
                [status, interview_formal_date || null, interview_formal_result || null,
                 interview_medical_date || null, interview_medical_result || null, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar postulante: ${error.message}`);
        }
    },

    /**
     * Marca un postulante como descartado.
     */
    discard: async (id) => {
        try {
            const result = await pool.query(
                `UPDATE public.postulantes
                 SET status = 'Descartado'
                 WHERE id = $1 RETURNING *`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al descartar postulante: ${error.message}`);
        }
    },

    /**
     * Marca un postulante como contratado.
     */
    hire: async (id) => {
        try {
            const result = await pool.query(
                `UPDATE public.postulantes
                 SET status = 'Contratado'
                 WHERE id = $1 RETURNING *`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al contratar postulante: ${error.message}`);
        }
    },

    /**
     * Elimina un postulante por ID.
     */
    remove: async (id) => {
        try {
            const result = await pool.query(
                'DELETE FROM public.postulantes WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al eliminar postulante: ${error.message}`);
        }
    }
};

module.exports = ApplicantsModel;
