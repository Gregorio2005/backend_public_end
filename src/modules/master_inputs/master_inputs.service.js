const MasterInputsModel = require('./master_inputs.model');

const MasterInputsService = {
    getAll: async () => {
        return await MasterInputsModel.findAll();
    },

    getById: async (id) => {
        const result = await MasterInputsModel.findById(id);
        if (!result) throw new Error('Registro maestro de insumo no encontrado');
        return result;
    },

    create: async (data) => {
        return await MasterInputsModel.create(data);
    },

    update: async (id, data) => {
        const result = await MasterInputsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Registro no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await MasterInputsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Registro no encontrado');
        return result;
    }
};

module.exports = MasterInputsService;