const InputsStuffingStampsDownspoutsModel = require('./inputs_stuffing_stamps_downspouts.model');
const { createNewVersion } = require('../../utils/versioning');

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
        const { newInput } = await createNewVersion('inputs_stuffing_stamps_downspouts', 1, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsStuffingStampsDownspoutsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsStuffingStampsDownspoutsService;