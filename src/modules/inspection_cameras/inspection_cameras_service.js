const InspectionCamerasModel = require('./inspection_cameras_model');

const InspectionCamerasService = {
    getAll: async () => await InspectionCamerasModel.findAll(),

    getById: async (id) => {
        const result = await InspectionCamerasModel.findById(id);
        if (!result) throw new Error('Inspección de cámara no encontrada');
        return result;
    },

    create: async (data) => {
        return await InspectionCamerasModel.create(data);
    },

    update: async (id, data) => {
        const result = await InspectionCamerasModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },

    delete: async (id) => {
        const result = await InspectionCamerasModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionCamerasService;