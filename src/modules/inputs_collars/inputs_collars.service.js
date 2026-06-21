const InputsCollarsModel = require('./inputs_collars.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsCollarsService = {
    getAll: async () => {
        return await InputsCollarsModel.findAll();
    },

    getById: async (id) => {
        const item = await InputsCollarsModel.findById(id);
        if (!item) throw new Error('Insumo de collar no encontrado');
        return item;
    },

    create: async (payload) => {
        return await InputsCollarsModel.create(payload);
    },

    update: async (id, payload) => {
        const { newInput } = await createNewVersion('inputs_collars', 10, id, payload);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },

    delete: async (id) => {
        return await InputsCollarsModel.delete(id);
    }
};

module.exports = InputsCollarsService;