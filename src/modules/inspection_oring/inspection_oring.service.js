const InspectionOringModel = require('./inspection_oring.model');

const InspectionOringService = {
    getAll: (billInputsId) => InspectionOringModel.findAll(billInputsId),
    getById: async (id) => {
        const result = await InspectionOringModel.findById(id);
        if (!result) throw new Error('Inspección de o-ring no encontrada');
        return result;
    },
    create: (data) => InspectionOringModel.create(data),
    update: async (id, data) => {
        const result = await InspectionOringModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionOringModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionOringService;