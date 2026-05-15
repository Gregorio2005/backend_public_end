const InputsThermoplasticsModel = require('./inputs_thermoplastics.model');

const InputsThermoplasticsService = {
    getAll: async () => {
        return await InputsThermoplasticsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsThermoplasticsModel.findById(id);
        if (!result) throw new Error('Insumo termoplástico no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsThermoplasticsModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsThermoplasticsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsThermoplasticsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsThermoplasticsService;