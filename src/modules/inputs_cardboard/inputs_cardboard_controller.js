const InputsCardboardModel = require('./inputs_cardboard_model');

const InputsCardboardController = {
    getAll: async (req, res) => {
        try {
            const data = await InputsCardboardModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InputsCardboardModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InputsCardboardModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InputsCardboardModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InputsCardboardModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, message: 'Registro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InputsCardboardController;