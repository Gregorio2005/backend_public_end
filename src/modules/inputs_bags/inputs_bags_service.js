const InputsBagsModel = require('./inputs_bags_model');

const InputsBagsService = {
    getAll: async () => await InputsBagsModel.findAll(),

    getById: async (id) => {
        const result = await InputsBagsModel.findById(id);
        if (!result) throw new Error('Insumo de bolsa no encontrado');
        return result;
    },

    create: async (data) => await InputsBagsModel.create(data),

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