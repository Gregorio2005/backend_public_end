const SuppliersModel = require('./suppliers.model');

const SuppliersService = {
    getAllSuppliers: async () => {
        return await SuppliersModel.findAll();
    },

    getSupplierById: async (id) => {
        const supplier = await SuppliersModel.findById(id);
        if (!supplier) throw new Error('Proveedor no encontrado');
        return supplier;
    },

    createSupplier: async (supplierData) => {
        return await SuppliersModel.create(supplierData);
    },

    updateSupplier: async (id, supplierData) => {
        const result = await SuppliersModel.update(id, supplierData);
        if (!result) throw new Error('Proveedor no encontrado para actualizar');
        return result;
    },

    deleteSupplier: async (id) => {
        const result = await SuppliersModel.delete(id);
        if (!result) throw new Error('Proveedor no encontrado para eliminar');
        return result;
    }
};

module.exports = SuppliersService;