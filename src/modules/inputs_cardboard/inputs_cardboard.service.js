const InputsCardboardModel = require('./inputs_cardboard.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsCardboardService = {
    getAll: async () => {
        return await InputsCardboardModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsCardboardModel.findById(id);
        if (!result) throw new Error('Insumo de cartón no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsCardboardModel.create(data);
    },
    update: async (id, data) => {
        const { newInput } = await createNewVersion('inputs_cardboard', 6, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsCardboardModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCardboardService;