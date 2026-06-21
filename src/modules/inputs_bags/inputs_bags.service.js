const InputsBagsModel = require('./inputs_bags.model');
const { createNewVersion } = require('../../utils/versioning');

const InputsBagsService = {
    getAll: async () => {
        return await InputsBagsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsBagsModel.findById(id);
        if (!result) throw new Error('Insumo de bolsa no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsBagsModel.create(data);
    },
    update: async (id, data) => {
        const { newInput } = await createNewVersion('inputs_bags', 5, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsBagsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsBagsService;