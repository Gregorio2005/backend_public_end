const InspectionStampsModel = require('./inspection_stamps_model');

const InspectionStampsService = {
    getAll: async () => await InspectionStampsModel.findAll(),

    getById: async (id) => {
        const result = await InspectionStampsModel.findById(id);
        if (!result) throw new Error('Inspección de sello no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionStampsModel.create(data);
    },

    update: async (id, data) => {
        const result = await InspectionStampsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },

    delete: async (id) => {
        const result = await InspectionStampsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionStampsService;