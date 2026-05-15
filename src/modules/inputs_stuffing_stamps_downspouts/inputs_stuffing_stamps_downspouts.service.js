const InputsStuffingStampsDownspoutsModel = require('./inputs_stuffing_stamps_downspouts.model');

const InputsStuffingStampsDownspoutsService = {
    getAll: async () => {
        return await InputsStuffingStampsDownspoutsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsStuffingStampsDownspoutsModel.findById(id);
        if (!result) throw new Error('Insumo de empaquetadura no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsStuffingStampsDownspoutsModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsStuffingStampsDownspoutsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsStuffingStampsDownspoutsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsStuffingStampsDownspoutsService;