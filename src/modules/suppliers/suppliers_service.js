const SuppliersModel = require('./suppliers_model');

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
        // Aquí se podría validar si el user_id ya tiene un proveedor asignado
        // o si el nombre del proveedor está duplicado.
        return await SuppliersModel.create(supplierData);
    },

    updateSupplier: async (id, supplierData) => {
        const result = await SuppliersModel.update(id, supplierData);
        if (!result) throw new Error('Proveedor no encontrado para actualizar');
        return result;
    },

    deleteSupplier: async (id) => {
        // Antes de eliminar, se podría verificar si el proveedor tiene facturas
        // asociadas en la tabla bill_data para evitar errores de FK.
        const result = await SuppliersModel.delete(id);
        if (!result) throw new Error('Proveedor no encontrado para eliminar');
        return result;
    }
};

module.exports = SuppliersService;