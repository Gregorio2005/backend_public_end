const ReportsRefusedModel = require('./reports_refused_model');

const ReportsRefusedController = {
    getAll: async (req, res) => {
        try {
            const data = await ReportsRefusedModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await ReportsRefusedModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await ReportsRefusedModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await ReportsRefusedModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await ReportsRefusedModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
            res.json({ success: true, message: 'Reporte eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = ReportsRefusedController;