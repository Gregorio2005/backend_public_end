const InspectionStuffingStampsDownspoutsModel = require('./inspection_stuffing_stamps_downspouts.model');

const InspectionStuffingStampsDownspoutsService = {
    getAll: () => InspectionStuffingStampsDownspoutsModel.findAll(),
    getById: async (id) => {
        const result = await InspectionStuffingStampsDownspoutsModel.findById(id);
        if (!result) throw new Error('Inspección de empaquetadura no encontrada');
        return result;
    },
    create: (data) => InspectionStuffingStampsDownspoutsModel.create(data),
    update: async (id, data) => {
        const result = await InspectionStuffingStampsDownspoutsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionStuffingStampsDownspoutsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionStuffingStampsDownspoutsService;