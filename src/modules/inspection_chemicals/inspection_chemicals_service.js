const InspectionChemicalsModel = require('./inspection_chemicals_model');

const InspectionChemicalsService = {
    getAll: async () => await InspectionChemicalsModel.findAll(),

    getById: async (id) => {
        const result = await InspectionChemicalsModel.findById(id);
        if (!result) throw new Error('Inspección de químico no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionChemicalsModel.create(data);
    },

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