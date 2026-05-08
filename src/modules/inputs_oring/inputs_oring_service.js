const InputsOringModel = require('./inputs_oring_model');

const InputsOringService = {
    getAll: async () => await InputsOringModel.findAll(),

    getById: async (id) => {
        const result = await InputsOringModel.findById(id);
        if (!result) throw new Error('Insumo Oring no encontrado');
        return result;
    },

    create: async (data) => await InputsOringModel.create(data),

    update: async (id, data) => {
        const result = await InputsOringModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await InputsOringModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsOringService;