const InspectionBagsModel = require('./inspection_bags.model');

const InspectionBagsService = {
    getAll: () => InspectionBagsModel.findAll(),
    getById: async (id) => {
        const result = await InspectionBagsModel.findById(id);
        if (!result) throw new Error('Inspección de bolsa no encontrada');
        return result;
    },
    create: (data) => InspectionBagsModel.create(data),
    update: async (id, data) => {
        const result = await InspectionBagsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionBagsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionBagsService;