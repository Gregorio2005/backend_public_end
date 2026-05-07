const SuppliersModel = require('./suppliers_model');

const SuppliersController = {
    getAll: async (req, res) => {
        try {
            const data = await SuppliersModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await SuppliersModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await SuppliersModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await SuppliersModel.update(req.params.id, req.body.name);
            if (!data) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await SuppliersModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
            res.json({ success: true, message: 'Proveedor eliminado' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = SuppliersController;