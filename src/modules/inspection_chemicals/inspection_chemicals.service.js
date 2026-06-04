const InspectionChemicalsModel = require('./inspection_chemicals.model');

const InspectionChemicalsService = {
    getAll: () => InspectionChemicalsModel.findAll(),
    getById: async (id) => {
        const result = await InspectionChemicalsModel.findById(id);
        if (!result) throw new Error('Inspección química no encontrada');
        return result;
    },
    create: (data) => InspectionChemicalsModel.create(data),
    update: async (id, data) => {
        const result = await InspectionChemicalsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionChemicalsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionChemicalsService;