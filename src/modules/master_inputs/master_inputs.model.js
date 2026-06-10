const pool = require('../../config/db');

const MasterInputsModel = {
    findAll: async (suppliers_id) => {
        // Realizamos JOINs con todas las tablas técnicas para obtener la 'reference' real del insumo.
        // Usamos COALESCE para capturar la referencia de la tabla que corresponda según el type_inputs_id.
        const query = `
            SELECT 
                mi.*,
                COALESCE(
                    t1.reference, t2.reference, t3.reference, t4.reference, t5.reference, 
                    t6.reference, t7.reference, t8.reference, t9.reference, t10.reference
                ) as reference
            FROM public.master_inputs mi
            LEFT JOIN public.inputs_stuffing_stamps_downspouts t1 ON mi.inputs_id = t1.id AND mi.type_inputs_id = 1
            LEFT JOIN public.inputs_stamps t2 ON mi.inputs_id = t2.id AND mi.type_inputs_id = 2
            LEFT JOIN public.inputs_oring t3 ON mi.inputs_id = t3.id AND mi.type_inputs_id = 3
            LEFT JOIN public.inputs_chemicals t4 ON mi.inputs_id = t4.id AND mi.type_inputs_id = 4
            LEFT JOIN public.inputs_bags t5 ON mi.inputs_id = t5.id AND mi.type_inputs_id = 5
            LEFT JOIN public.inputs_cardboard t6 ON mi.inputs_id = t6.id AND mi.type_inputs_id = 6
            LEFT JOIN public.inputs_cases t7 ON mi.inputs_id = t7.id AND mi.type_inputs_id = 7
            LEFT JOIN public.inputs_thermoplastics t8 ON mi.inputs_id = t8.id AND mi.type_inputs_id = 8
            LEFT JOIN public.inputs_cameras t9 ON mi.inputs_id = t9.id AND mi.type_inputs_id = 9
            LEFT JOIN public.inputs_collars t10 ON mi.inputs_id = t10.id AND mi.type_inputs_id = 10
            ${suppliers_id ? 'WHERE mi.suppliers_id = $1' : ''}
            ORDER BY mi.id ASC`;

        let params = [];
        if (suppliers_id) {
            params.push(suppliers_id);
        }

        const { rows } = await pool.query(query, params);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM public.master_inputs WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { inputs_id, type_inputs_id, suppliers_id, status } = data;
        const query = `
            INSERT INTO public.master_inputs (inputs_id, type_inputs_id, suppliers_id, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const { rows } = await pool.query(query, [inputs_id, type_inputs_id, suppliers_id, status]);
        return rows[0];
    },

    update: async (id, data) => {
        const { inputs_id, type_inputs_id, suppliers_id, status } = data;
        const query = `
            UPDATE public.master_inputs
            SET inputs_id = $1, type_inputs_id = $2, suppliers_id = $3, status = $4, update_at = CURRENT_DATE
            WHERE id = $5
            RETURNING *`;
        const { rows } = await pool.query(query, [inputs_id, type_inputs_id, suppliers_id, status, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM public.master_inputs WHERE id = $1 RETURNING id';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = MasterInputsModel;