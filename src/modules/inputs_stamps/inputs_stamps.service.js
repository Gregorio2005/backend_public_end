const InputsStampsModel = require('./inputs_stamps.model');

const InputsStampsService = {
    getAll: async () => {
        return await InputsStampsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsStampsModel.findById(id);
        if (!result) throw new Error('Insumo de sello no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsStampsModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsStampsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsStampsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsStampsService;