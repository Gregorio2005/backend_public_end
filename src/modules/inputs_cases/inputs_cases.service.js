const InputsCasesModel = require('./inputs_cases.model');
const { createNewVersion } = require('../../utils/versioning');

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
        const { newInput } = await createNewVersion('inputs_cases', 7, id, data);
        if (!newInput) throw new Error('No se pudo crear nueva version del insumo');
        return newInput;
    },
    delete: async (id) => {
        const result = await InputsCasesModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCasesService;