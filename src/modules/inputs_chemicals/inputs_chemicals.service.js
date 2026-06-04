const InputsChemicalsModel = require('./inputs_chemicals.model');

const InputsChemicalsService = {
    getAll: async () => {
        return await InputsChemicalsModel.findAll();
    },
    getById: async (id) => {
        const result = await InputsChemicalsModel.findById(id);
        if (!result) throw new Error('Insumo químico no encontrado');
        return result;
    },
    create: async (data) => {
        return await InputsChemicalsModel.create(data);
    },
    update: async (id, data) => {
        const result = await InputsChemicalsModel.update(id, data);
        if (!result) throw new Error('No se pudo actualizar: Insumo no encontrado');
        return result;
    },
    delete: async (id) => {
        const result = await InputsChemicalsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Insumo no encontrado');
        return result;
    }
};

module.exports = InputsChemicalsService;