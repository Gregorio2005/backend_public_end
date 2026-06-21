const InputsStampsModel = require('./inputs_stamps.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsStampsService = {
    getAll: async () => {
        return await InputsStampsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsStampsModel.findById(id);
        if (!result) throw new Error('Insumo de sello no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsStampsModel.create(data);
    },
    update: async (id, data) => {
        const { newInput } = await createNewVersion('inputs_stamps', 2, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsStampsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsStampsService;