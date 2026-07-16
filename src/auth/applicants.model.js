const pool = require('../config/db');
const { paginate } = require('../utils/pagination');

const BASE_SELECT = `SELECT id, name, lastname, ci, email, phone, birth_date, rol, cv_url,
                            status, interview_formal_date, interview_formal_result,
                            interview_medical_date, interview_medical_result, created_at
                     FROM public.postulantes`;

const ApplicantsModel = {
    findAll: async ({ page, limit, search, status, sort, sortDir } = {}) => {
        try {
            const conditions = [];
            const params = [];

            if (search) {
                params.push(`%${search}%`);
                const idx = params.length;
                conditions.push(`(
                    name ILIKE $${idx} OR
                    lastname ILIKE $${idx} OR
                    ci ILIKE $${idx}
                )`);
            }

            if (status) {
                const statuses = status.split(',').filter(Boolean);
                if (statuses.length > 0) {
                    params.push(statuses);
                    conditions.push(`status = ANY($${params.length}::text[])`);
                }
            }

            const statusOrder = `CASE status
                WHEN 'En revision' THEN 1
                WHEN 'Pendiente' THEN 2
                WHEN 'Aprobado' THEN 3
                WHEN 'Contratado' THEN 4
                WHEN 'Rechazado' THEN 5
                WHEN 'Descartado' THEN 6
                ELSE 7 END`;

            let query = BASE_SELECT;
            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }

            const allowedSorts = ['name', 'lastname', 'ci', 'status'];
            if (allowedSorts.includes(sort)) {
                const dir = sortDir === 'desc' ? 'DESC' : 'ASC';
                if (sort === 'status') {
                    query += ` ORDER BY ${statusOrder} ${dir}, id ASC`;
                } else {
                    const col = `"${sort}"`;
                    query += ` ORDER BY ${col} ${dir}, ${statusOrder} ASC, id ASC`;
                }
            } else {
                query += ` ORDER BY ${statusOrder} ASC, id ASC`;
            }

            return await paginate(query, params, { page, limit });
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
                `SELECT id, name, lastname, ci, email, phone, birth_date, rol, cv_url,
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
        const { name, lastname, ci, email, phone, birth_date, rol, cv_url } = data;
        try {
            const result = await pool.query(
                `INSERT INTO public.postulantes
                    (name, lastname, ci, email, phone, birth_date, rol, cv_url, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING *`,
                [name, lastname, ci, email, phone || null, birth_date || null, rol, cv_url || null, 'En revision']
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
