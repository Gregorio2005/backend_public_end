const ReportsApprovedModel = require('./reports_approved_model');

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
        // Lógica: Se podría verificar que la suma de cantidades aprobadas 
        // no exceda la cantidad total de la factura original.
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
    }
};

module.exports = ReportsApprovedService;