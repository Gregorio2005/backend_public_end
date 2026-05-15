const TypeInputsModel = require('./type_inputs.model');

const TypeInputsService = {
    getAll: () => TypeInputsModel.findAll(),

    getById: async (id) => {
        const result = await TypeInputsModel.findById(id);
        if (!result) throw new Error('Tipo de insumo no encontrado');
        return result;
    },

    create: (data) => TypeInputsModel.create(data.name),

    update: async (id, data) => {
        const result = await TypeInputsModel.update(id, data.name);
        if (!result) throw new Error('No se pudo actualizar: Tipo de insumo no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await TypeInputsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Tipo de insumo no encontrado');
        return result;
    }
};

module.exports = TypeInputsService;