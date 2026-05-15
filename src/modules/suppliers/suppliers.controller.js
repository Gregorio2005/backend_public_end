const SuppliersService = require('./suppliers.service');

const SuppliersController = {
    getAll: async (req, res, next) => {
        try {
            const result = await SuppliersService.getAllSuppliers();
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const result = await SuppliersService.getSupplierById(req.params.id);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const result = await SuppliersService.createSupplier(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const result = await SuppliersService.updateSupplier(req.params.id, req.body);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await SuppliersService.deleteSupplier(req.params.id);
            res.json({ success: true, message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            // Manejo de integridad referencial (Punto 5 de la ruta)
            if (error.code === '23503') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No se puede eliminar el proveedor porque tiene facturas (bill_data) asociadas' 
                });
            }
            next(error);
        }
    }
};

module.exports = SuppliersController;