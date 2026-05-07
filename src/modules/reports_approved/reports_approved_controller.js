const ReportsApprovedModel = require('./reports_approved_model');

const ReportsApprovedController = {
    getAll: async (req, res) => {
        try {
            const data = await ReportsApprovedModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await ReportsApprovedModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await ReportsApprovedModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await ReportsApprovedModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await ReportsApprovedModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, message: 'Reporte eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = ReportsApprovedController;