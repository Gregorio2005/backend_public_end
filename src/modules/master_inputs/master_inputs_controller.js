const MasterInputsModel = require('./master_inputs_model');

const MasterInputsController = {
    getAll: async (req, res) => {
        try {
            const result = await MasterInputsModel.findAll();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const result = await MasterInputsModel.findById(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Registro maestro no encontrado' });
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            // Se espera inputs_id, type_inputs_id y status
            const result = await MasterInputsModel.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { status } = req.body;
            if (!status) return res.status(400).json({ success: false, message: 'El estado (status) es requerido' });
            
            const result = await MasterInputsModel.updateStatus(req.params.id, status);
            if (!result) return res.status(404).json({ success: false, message: 'Registro maestro no encontrado' });
            
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const result = await MasterInputsModel.delete(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Registro maestro no encontrado' });
            
            res.json({ success: true, message: 'Registro maestro eliminado correctamente' });
        } catch (error) {
            // Manejo de error por integridad referencial
            if (error.code === '23503') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No se puede eliminar: el registro está siendo utilizado en las tablas de facturación o inspección' 
                });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = MasterInputsController;