const InputsThermoplasticsModel = require('./inputs_thermoplastics.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsThermoplasticsService = {
    getAll: async () => {
        return await InputsThermoplasticsModel.findAll();
    },

    getById: async (id) => {
        const item = await InputsThermoplasticsModel.findById(id);
        if (!item) throw new Error('Insumo termoplástico no encontrado');
        return item;
    },

    create: async (payload) => {
        return await InputsThermoplasticsModel.create(payload);
    },

    update: async (id, payload) => {
        const { newInput } = await createNewVersion('inputs_thermoplastics', 8, id, payload);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },

    delete: async (id) => {
        return await InputsThermoplasticsModel.delete(id);
    }
};

module.exports = InputsThermoplasticsService;