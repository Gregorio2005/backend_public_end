const BillDataModel = require('./bill_data.model');

const BillDataService = {
    getAll: async () => {
        return await BillDataModel.findAll();
    },

    getById: async (id) => {
        const result = await BillDataModel.findById(id);
        if (!result) throw new Error('Factura no encontrada');
        return result;
    },

    create: async (data) => {
        // Lógica avanzada: Se podría validar que el número de factura no esté duplicado
        // o que la fecha de recepción no sea anterior a la de facturación.
        return await BillDataModel.create(data);
    },

    update: async (id, data) => {
        const result = await BillDataModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Factura no encontrada');
        return result;
    },

    delete: async (id) => {
        const result = await BillDataModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Factura no encontrada');
        return result;
    }
};

module.exports = BillDataService;