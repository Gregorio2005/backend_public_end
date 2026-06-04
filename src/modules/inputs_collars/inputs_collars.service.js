const InputsCollarsModel = require('./inputs_collars.model');

const InputsCollarsService = {
    getAll: async () => {
        return await InputsCollarsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsCollarsModel.findById(id);
        if (!result) throw new Error('Insumo de collar no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsCollarsModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsCollarsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsCollarsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCollarsService;