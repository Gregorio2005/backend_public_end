const InspectionThermoplasticsModel = require('./inspection_thermoplastics.model');

const InspectionThermoplasticsService = {
    getAll: () => InspectionThermoplasticsModel.findAll(),
    getById: async (id) => {
        const result = await InspectionThermoplasticsModel.findById(id);
        if (!result) throw new Error('Inspección termoplástica no encontrada');
        return result;
    },
    create: (data) => InspectionThermoplasticsModel.create(data),
    update: async (id, data) => {
        const result = await InspectionThermoplasticsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionThermoplasticsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionThermoplasticsService;