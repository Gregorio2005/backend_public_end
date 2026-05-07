const BillDataModel = require('./bill_data_model');

const BillDataController = {
    getAll: async (req, res) => {
        try {
            const data = await BillDataModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const data = await BillDataModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Factura no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = await BillDataModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const data = await BillDataModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Factura no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            // Nota: En bill_data no solemos borrar por integridad, pero si es necesario:
            const { rows } = await require('../../config/db').query('DELETE FROM public.bill_data WHERE id = $1 RETURNING id', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ success: false, message: 'Factura no encontrada' });
            res.json({ success: true, message: 'Factura eliminada correctamente' });
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).json({ success: false, message: 'No se puede eliminar: esta factura tiene insumos asociados' });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = BillDataController;