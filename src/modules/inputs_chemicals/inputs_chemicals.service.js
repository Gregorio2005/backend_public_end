const InputsChemicalsModel = require('./inputs_chemicals.model');

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
        return await InputsChemicalsModel.update(id, payload);
    },

    delete: async (id) => {
        return await InputsChemicalsModel.delete(id);
    }
};

module.exports = InputsChemicalsService;