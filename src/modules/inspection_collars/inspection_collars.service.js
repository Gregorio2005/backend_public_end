const InspectionCollarsModel = require('./inspection_collars.model');

const InspectionCollarsService = {
    getAll: () => InspectionCollarsModel.findAll(),
    getById: async (id) => {
        const result = await InspectionCollarsModel.findById(id);
        if (!result) throw new Error('Inspección de collar no encontrada');
        return result;
    },
    create: (data) => InspectionCollarsModel.create(data),
    update: async (id, data) => {
        const result = await InspectionCollarsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionCollarsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionCollarsService;