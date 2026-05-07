const BillInputsModel = require('./bill_inputs_model');

const BillInputsController = {
    getAll: async (req, res) => {
        try {
            const data = await BillInputsModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const data = await BillInputsModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Renglón no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getByBill: async (req, res) => {
        try {
            const data = await BillInputsModel.findByBillId(req.params.billId);
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = await BillInputsModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const data = await BillInputsModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Renglón no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await BillInputsModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Renglón no encontrado' });
            res.json({ success: true, message: 'Renglón de factura eliminado' });
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).json({ success: false, message: 'No se puede eliminar: el renglón ya tiene una inspección asociada' });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = BillInputsController;