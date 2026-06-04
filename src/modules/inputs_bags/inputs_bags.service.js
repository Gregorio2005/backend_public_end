const InputsBagsModel = require('./inputs_bags.model');

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
        const result = await InputsBagsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsBagsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsBagsService;