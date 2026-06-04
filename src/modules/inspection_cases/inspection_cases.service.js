const InspectionCasesModel = require('./inspection_cases.model');

const InspectionCasesService = {
    getAll: () => InspectionCasesModel.findAll(),
    getById: async (id) => {
        const result = await InspectionCasesModel.findById(id);
        if (!result) throw new Error('Inspección de caja no encontrada');
        return result;
    },
    create: (data) => InspectionCasesModel.create(data),
    update: async (id, data) => {
        const result = await InspectionCasesModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionCasesModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionCasesService;