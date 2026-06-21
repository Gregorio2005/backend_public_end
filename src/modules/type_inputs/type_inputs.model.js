const pool = require('../../config/db');

const TypeInputsModel = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM public.type_inputs ORDER BY id ASC');
        return rows;
    },

    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM public.type_inputs WHERE id = $1', [id]);
        return rows[0];
    },

    create: async (name) => {
        const { rows } = await pool.query('INSERT INTO public.type_inputs (name) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    },

    update: async (id, name) => {
        const { rows } = await pool.query(
            'UPDATE public.type_inputs SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        return rows[0];
    },

    delete: async (id) => {
        const { rows } = await pool.query('DELETE FROM public.type_inputs WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    },

    findInputsByTable: async (tableName) => {
        const allowedTables = [
            'inputs_stuffing_stamps_downspouts', 'inputs_stamps', 'inputs_oring',
            'inputs_chemicals', 'inputs_bags', 'inputs_cardboard',
            'inputs_cases', 'inputs_thermoplastics', 'inputs_cameras', 'inputs_collars'
        ];
        if (!allowedTables.includes(tableName)) {
            throw new Error(`Tabla no válida: ${tableName}`);
        }
        const { rows } = await pool.query(`SELECT * FROM public."${tableName}" ORDER BY id ASC`);
        return rows;
    },

    findVigenteInputsByTable: async (tableName, typeInputsId) => {
        const allowedTables = [
            'inputs_stuffing_stamps_downspouts', 'inputs_stamps', 'inputs_oring',
            'inputs_chemicals', 'inputs_bags', 'inputs_cardboard',
            'inputs_cases', 'inputs_thermoplastics', 'inputs_cameras', 'inputs_collars'
        ];
        if (!allowedTables.includes(tableName)) {
            throw new Error(`Tabla no válida: ${tableName}`);
        }
        const { rows } = await pool.query(`
            SELECT t.*, COALESCE(
                (SELECT m.status::text FROM public.master_inputs m 
                 WHERE m.inputs_id = t.id AND m.type_inputs_id = $1 
                 ORDER BY m.id DESC LIMIT 1), 
                'Sin estado'
            ) AS master_status
            FROM public."${tableName}" t
            ORDER BY t.id ASC
        `, [typeInputsId]);
        return rows;
    }
};

module.exports = TypeInputsModel;