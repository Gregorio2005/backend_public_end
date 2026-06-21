const InputsOringModel = require('./inputs_oring.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsOringService = {
    getAll: async () => {
        return await InputsOringModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsOringModel.findById(id);
        if (!result) throw new Error('Insumo de o-ring no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsOringModel.create(data);
    },
    update: async (id, data) => {
        const { newInput } = await createNewVersion('inputs_oring', 3, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsOringModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsOringService;