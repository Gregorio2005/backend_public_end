const InputsStuffingModel = require('./inputs_stuffing_stamps_downspouts_model');

const InputsStuffingService = {
    getAll: async () => await InputsStuffingModel.findAll(),

    getById: async (id) => {
        const result = await InputsStuffingModel.findById(id);
        if (!result) throw new Error('Insumo de estopera/bajante no encontrado');
        return result;
    },

    create: async (data) => await InputsStuffingModel.create(data),

    update: async (id, data) => {
        const result = await InputsStuffingModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await InputsStuffingModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsStuffingService;