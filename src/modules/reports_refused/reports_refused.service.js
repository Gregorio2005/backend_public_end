const ReportsRefusedModel = require('./reports_refused.model');

const ReportsRefusedService = {
    getAll: async () => {
        return await ReportsRefusedModel.findAll();
    },

    getById: async (id) => {
        const result = await ReportsRefusedModel.findById(id);
        if (!result) throw new Error('Reporte de rechazo no encontrado');
        return result;
    },

    create: async (data) => {
        // Validación de lógica de negocio: La fecha del reclamo no puede ser futura
        const claimDate = new Date(data.claim_date);
        if (claimDate > new Date()) {
            throw new Error('La fecha del reclamo no puede ser una fecha futura');
        }
        return await ReportsRefusedModel.create(data);
    },

    update: async (id, data) => {
        const result = await ReportsRefusedModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Reporte no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await ReportsRefusedModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Reporte no encontrado');
        return result;
    },

    incrementQuantity: async (billDataId, quantity, rejectionReason = null) => {
        return await ReportsRefusedModel.incrementQuantity(billDataId, quantity, rejectionReason);
    }
};

module.exports = ReportsRefusedService;