const InspectionChemicalsModel = require('./inspection_chemicals_model');

const InspectionChemicalsController = {
    getAll: async (req, res) => {
        try {
            const data = await InspectionChemicalsModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InspectionChemicalsModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InspectionChemicalsModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InspectionChemicalsModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InspectionChemicalsModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Inspección no encontrada' });
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InspectionChemicalsController;