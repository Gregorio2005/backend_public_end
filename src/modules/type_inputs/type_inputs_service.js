const TypeInputsModel = require('./type_inputs_model');

const TypeInputsService = {
    getAllTypes: async () => {
        return await TypeInputsModel.findAll();
    },

    getTypeById: async (id) => {
        const type = await TypeInputsModel.findById(id);
        if (!type) throw new Error('Tipo de insumo no encontrado');
        return type;
    },

    createNewType: async (name) => {
        return await TypeInputsModel.create(name);
    },

    updateType: async (id, name) => {
        const result = await TypeInputsModel.update(id, name);
        if (!result) throw new Error('Tipo de insumo no encontrado para actualizar');
        return result;
    },

    deleteType: async (id) => {
        const result = await TypeInputsModel.delete(id);
        if (!result) throw new Error('Tipo de insumo no encontrado para eliminar');
        return result;
    }
};

module.exports = TypeInputsService;