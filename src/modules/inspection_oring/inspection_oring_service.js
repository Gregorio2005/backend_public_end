const InspectionOringModel = require('./inspection_oring_model');

const InspectionOringService = {
    getAll: async () => await InspectionOringModel.findAll(),

    getById: async (id) => {
        const result = await InspectionOringModel.findById(id);
        if (!result) throw new Error('Inspección de Oring no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionOringModel.create(data);
    },

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