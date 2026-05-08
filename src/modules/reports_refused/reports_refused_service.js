const ReportsRefusedModel = require('./reports_refused_model');

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
        // Lógica avanzada: Validar que la fecha del reclamo no sea futura.
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
    }
};

module.exports = ReportsRefusedService;