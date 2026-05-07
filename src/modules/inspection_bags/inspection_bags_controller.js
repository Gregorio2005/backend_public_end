const InspectionBagsModel = require('./inspection_bags_model');

const InspectionBagsController = {
    getAll: async (req, res) => {
        try {
            const data = await InspectionBagsModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InspectionBagsModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InspectionBagsModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InspectionBagsModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InspectionBagsModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InspectionBagsController;