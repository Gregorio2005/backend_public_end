const pool = require('../config/db');

/**
 * Crea una nueva version de un insumo sin modificar el registro original.
 * Flujo:
 * 1. Lee el registro actual de la tabla tecnica.
 * 2. Busca y marca como 'Desuso' el master_inputs asociado.
 * 3. Inserta un nuevo registro en la tabla tecnica con los datos actualizados.
 * 4. Crea un nuevo master_inputs apuntando al nuevo registro con status 'Vigente'.
 *
 * @param {string} tableName - Nombre de la tabla tecnica (ej: 'inputs_bags')
 * @param {number} typeInputsId - ID del tipo de insumo (1-10)
 * @param {number} oldInputsId - ID del registro actual a versionar
 * @param {object} newData - Nuevos datos tecnicos a aplicar
 * @returns {object} - { newInput, newMasterInput, oldMasterInput }
 */
async function createNewVersion(tableName, typeInputsId, oldInputsId, newData) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Leer el registro actual de la tabla tecnica
        const oldRecordResult = await client.query(
            `SELECT * FROM public."${tableName}" WHERE id = $1`,
            [oldInputsId]
        );
        if (oldRecordResult.rows.length === 0) {
            throw new Error('Insumo no encontrado en la tabla tecnica');
        }
        const oldRecord = oldRecordResult.rows[0];

        // 2. Buscar el master_inputs vigente para este insumo
        const masterResult = await client.query(
            `SELECT * FROM public.master_inputs 
             WHERE inputs_id = $1 AND type_inputs_id = $2 AND status = 'Vigente'`,
            [oldInputsId, typeInputsId]
        );
        if (masterResult.rows.length === 0) {
            throw new Error(
                `No se encontro un registro maestro vigente para el insumo ID ${oldInputsId} de tipo ${typeInputsId}`
            );
        }
        const oldMaster = masterResult.rows[0];

        // 3. Marcar el master_inputs antiguo como 'Desuso'
        await client.query(
            `UPDATE public.master_inputs SET status = 'Desuso', update_at = CURRENT_DATE WHERE id = $1`,
            [oldMaster.id]
        );

        // 4. Fusionar registro antiguo con nuevos datos (excluyendo campos auto-generados)
        const { id, created_at, update_at, ...baseRecord } = oldRecord;
        const newRecord = { ...baseRecord, ...newData };

        // 5. Insertar el nuevo registro en la tabla tecnica
        const columns = Object.keys(newRecord);
        const values = Object.values(newRecord);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

        const insertResult = await client.query(
            `INSERT INTO public."${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) 
             VALUES (${placeholders}) 
             RETURNING *`,
            values
        );
        const newInput = insertResult.rows[0];

        // 6. Obtener suppliers_id del master antiguo (puede no existir en versiones viejas de la DB)
        let suppliersId = null;
        if (oldMaster.suppliers_id !== undefined && oldMaster.suppliers_id !== null) {
            suppliersId = oldMaster.suppliers_id;
        }

        // 7. Crear el nuevo master_inputs apuntando al nuevo registro
        let newMasterResult;
        if (suppliersId !== null) {
            newMasterResult = await client.query(
                `INSERT INTO public.master_inputs (inputs_id, type_inputs_id, suppliers_id, status) 
                 VALUES ($1, $2, $3, 'Vigente') 
                 RETURNING *`,
                [newInput.id, typeInputsId, suppliersId]
            );
        } else {
            newMasterResult = await client.query(
                `INSERT INTO public.master_inputs (inputs_id, type_inputs_id, status) 
                 VALUES ($1, $2, 'Vigente') 
                 RETURNING *`,
                [newInput.id, typeInputsId]
            );
        }

        await client.query('COMMIT');

        return {
            newInput,
            newMasterInput: newMasterResult.rows[0],
            oldMasterInput: oldMaster
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { createNewVersion };
