const InputsStuffingModel = require('./inputs_stuffing_stamps_downspouts_model');

const InputsStuffingController = {
    getAll: async (req, res) => {
        try {
            const data = await InputsStuffingModel.findAll();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await InputsStuffingModel.findById(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const data = await InputsStuffingModel.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = await InputsStuffingModel.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            const data = await InputsStuffingModel.delete(req.params.id);
            if (!data) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
            res.json({ success: true, message: 'Registro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = InputsStuffingController;