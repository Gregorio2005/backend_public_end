const InputsThermoplasticsModel = require('./inputs_thermoplastics.model');

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
        return await InputsThermoplasticsModel.update(id, payload);
    },

    delete: async (id) => {
        return await InputsThermoplasticsModel.delete(id);
    }
};

module.exports = InputsThermoplasticsService;