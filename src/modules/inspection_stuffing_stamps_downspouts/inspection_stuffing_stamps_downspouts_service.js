const InspectionStuffingModel = require('./inspection_stuffing_stamps_downspouts_model');

const InspectionStuffingService = {
    getAll: async () => await InspectionStuffingModel.findAll(),

    getById: async (id) => {
        const result = await InspectionStuffingModel.findById(id);
        if (!result) throw new Error('Inspección de estopera/bajante no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionStuffingModel.create(data);
    },

    update: async (id, data) => {
        const result = await InspectionStuffingModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },

    delete: async (id) => {
        const result = await InspectionStuffingModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionStuffingService;