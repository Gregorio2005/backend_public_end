const InputsBagsModel = require('./inputs_bags_model');

const InputsBagsController = {
    getAll: async (req, res) => {
        try {
            const data = await InputsBagsModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InputsBagsModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InputsBagsModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InputsBagsModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InputsBagsModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, message: 'Registro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InputsBagsController;