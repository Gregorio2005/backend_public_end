const pool = require('../../config/db');

const ReportPdfModel = {
    getBillData: async (billDataId) => {
        const query = `
            SELECT bd.*, s.name AS supplier_name
            FROM public.bill_data bd
            JOIN public.suppliers s ON s.id = bd.suppliers_id
            WHERE bd.id = $1`;
        const { rows } = await pool.query(query, [billDataId]);
        return rows[0];
    },

    getBillInputs: async (billDataId) => {
        const query = `
            SELECT bi.*,
                COALESCE(
                    t1.reference, t2.reference, t3.reference, t4.reference, t5.reference, 
                    t6.reference, t7.reference, t8.reference, t9.reference, t10.reference
                ) AS reference,
                ti.name AS type_name, ti.id AS type_inputs_id
            FROM public.bill_inputs bi
            JOIN public.master_inputs mi ON mi.id = bi.master_inputs_id
            JOIN public.type_inputs ti ON ti.id = mi.type_inputs_id
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
            WHERE bi.bill_data_id = $1`;
        const { rows } = await pool.query(query, [billDataId]);
        return rows;
    },

    getReportsApproved: async (billDataId) => {
        const query = 'SELECT * FROM public.reports_approved WHERE bill_data_id = $1 ORDER BY id ASC';
        const { rows } = await pool.query(query, [billDataId]);
        return rows;
    },

    getReportsRefused: async (billDataId) => {
        const query = 'SELECT * FROM public.reports_refused WHERE bill_data_id = $1 ORDER BY id ASC';
        const { rows } = await pool.query(query, [billDataId]);
        return rows;
    }
};

module.exports = ReportPdfModel;
