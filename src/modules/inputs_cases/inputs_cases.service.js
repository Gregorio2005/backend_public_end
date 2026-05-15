const InputsCasesModel = require('./inputs_cases.model');

const InputsCasesService = {
    getAll: async () => {
        return await InputsCasesModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsCasesModel.findById(id);
        if (!result) throw new Error('Insumo de caja no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsCasesModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsCasesModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsCasesModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCasesService;