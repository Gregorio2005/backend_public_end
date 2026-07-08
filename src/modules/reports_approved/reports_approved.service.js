const ReportsApprovedModel = require('./reports_approved.model');

const ReportsApprovedService = {
    getAll: async () => {
        return await ReportsApprovedModel.findAll();
    },

    getById: async (id) => {
        const result = await ReportsApprovedModel.findById(id);
        if (!result) throw new Error('Reporte de aprobación no encontrado');
        return result;
    },

    create: async (data) => {
        return await ReportsApprovedModel.create(data);
    },

    update: async (id, data) => {
        const result = await ReportsApprovedModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Reporte no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await ReportsApprovedModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Reporte no encontrado');
        return result;
    },

    incrementQuantity: async (billDataId, quantity) => {
        return await ReportsApprovedModel.incrementQuantity(billDataId, quantity);
    }
};

module.exports = ReportsApprovedService;