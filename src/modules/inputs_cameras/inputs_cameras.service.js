const InputsCamerasModel = require('./inputs_cameras.model');

const InputsCamerasService = {
    getAll: async () => {
        return await InputsCamerasModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsCamerasModel.findById(id);
        if (!result) throw new Error('Insumo de cámara no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsCamerasModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsCamerasModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsCamerasModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsCamerasService;