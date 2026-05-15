const InputsCardboardModel = require('./inputs_cardboard.model');

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
        const result = await InputsCardboardModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsCardboardModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCardboardService;