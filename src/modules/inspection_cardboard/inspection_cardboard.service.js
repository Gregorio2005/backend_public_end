const InspectionCardboardModel = require('./inspection_cardboard.model');

const InspectionCardboardService = {
    getAll: (billInputsId) => InspectionCardboardModel.findAll(billInputsId),
    getById: async (id) => {
        const result = await InspectionCardboardModel.findById(id);
        if (!result) throw new Error('Inspección de cartón no encontrada');
        return result;
    },
    create: (data) => InspectionCardboardModel.create(data),
    update: async (id, data) => {
        const result = await InspectionCardboardModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Inspección no encontrada');
        return result;
    },
    delete: async (id) => {
        const result = await InspectionCardboardModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Inspección no encontrada');
        return result;
    }
};

module.exports = InspectionCardboardService;