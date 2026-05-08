const InspectionCollarsModel = require('./inspection_collars_model');

const InspectionCollarsService = {
    getAll: async () => await InspectionCollarsModel.findAll(),

    getById: async (id) => {
        const result = await InspectionCollarsModel.findById(id);
        if (!result) throw new Error('Inspección de collarín no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionCollarsModel.create(data);
    },

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