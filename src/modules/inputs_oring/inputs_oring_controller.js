const InputsOringModel = require('./inputs_oring_model');

const InputsOringController = {
    getAll: async (req, res) => {
        try {
            const data = await InputsOringModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InputsOringModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InputsOringModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InputsOringModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InputsOringModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, message: 'Registro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InputsOringController;