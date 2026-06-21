const InputsChemicalsModel = require('./inputs_chemicals.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsChemicalsService = {
    getAll: async () => {
        return await InputsChemicalsModel.findAll();
    },

    getById: async (id) => {
        const item = await InputsChemicalsModel.findById(id);
        if (!item) throw new Error('Insumo químico no encontrado');
        return item;
    },

    create: async (payload) => {
        return await InputsChemicalsModel.create(payload);
    },

    update: async (id, payload) => {
        const { newInput } = await createNewVersion('inputs_chemicals', 4, id, payload);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },

    delete: async (id) => {
        return await InputsChemicalsModel.delete(id);
    }
};

module.exports = InputsChemicalsService;