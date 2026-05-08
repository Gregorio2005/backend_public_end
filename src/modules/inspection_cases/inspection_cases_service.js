const InspectionCasesModel = require('./inspection_cases_model');

const InspectionCasesService = {
    getAll: async () => await InspectionCasesModel.findAll(),

    getById: async (id) => {
        const result = await InspectionCasesModel.findById(id);
        if (!result) throw new Error('Inspección de estuche no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionCasesModel.create(data);
    },

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