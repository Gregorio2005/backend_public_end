const TypeInputsModel = require('./type_inputs_model');

const TypeInputsController = {
    getAll: async (req, res) => {
        try {
            const result = await TypeInputsModel.findAll();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const result = await TypeInputsModel.findById(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Tipo de insumo no encontrado' });
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ success: false, message: 'El nombre es requerido' });
            const result = await TypeInputsModel.create(name);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { name } = req.body;
            const result = await TypeInputsModel.update(req.params.id, name);
            if (!result) return res.status(404).json({ success: false, message: 'Tipo de insumo no encontrado' });
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const result = await TypeInputsModel.delete(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Tipo de insumo no encontrado' });
            res.json({ success: true, message: 'Tipo de insumo eliminado correctamente' });
        } catch (error) {
            // Manejo de restricción de llave foránea (si hay master_inputs asociados)
            if (error.code === '23503') {
                return res.status(400).json({ success: false, message: 'No se puede eliminar: el tipo de insumo está siendo utilizado en el inventario maestro' });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = TypeInputsController;