const BillInputsModel = require('./bill_inputs_model');

const BillInputsService = {
    getAll: async () => {
        return await BillInputsModel.findAll();
    },

    getById: async (id) => {
        const result = await BillInputsModel.findById(id);
        if (!result) throw new Error('Detalle de factura no encontrado');
        return result;
    },

    create: async (data) => {
        // Lógica avanzada: Validar que el master_inputs_id esté activo (Vigente)
        return await BillInputsModel.create(data);
    },

    update: async (id, data) => {
        const result = await BillInputsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Detalle no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await BillInputsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Detalle no encontrado');
        return result;
    }
};

module.exports = BillInputsService;