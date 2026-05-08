const InspectionBagsModel = require('./inspection_bags_model');

const InspectionBagsService = {
    getAll: async () => await InspectionBagsModel.findAll(),

    getById: async (id) => {
        const result = await InspectionBagsModel.findById(id);
        if (!result) throw new Error('Inspección de bolsa no encontrada');
        return result;
    },

    create: async (data) => {
        // Lógica de negocio: Aquí se podría validar que el bill_inputs_id no tenga ya una inspección
        return await InspectionBagsModel.create(data);
    },

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