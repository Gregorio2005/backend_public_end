const InputsCollarsModel = require('./inputs_collars.model');

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
        return await InputsCollarsModel.update(id, payload);
    },

    delete: async (id) => {
        return await InputsCollarsModel.delete(id);
    }
};

module.exports = InputsCollarsService;