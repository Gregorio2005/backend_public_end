const RolesModel = require('./roles_model');

const RolesController = {
    getAll: async (req, res) => {
        try {
            const roles = await RolesModel.findAll();
            res.json({ success: true, data: roles });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const role = await RolesModel.findById(req.params.id);
            if (!role) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            res.json({ success: true, data: role });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ success: false, message: 'El nombre es requerido' });
            const newRole = await RolesModel.create(name);
            res.status(201).json({ success: true, data: newRole });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { name } = req.body;
            const updatedRole = await RolesModel.update(req.params.id, name);
            if (!updatedRole) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            res.json({ success: true, data: updatedRole });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const deleted = await RolesModel.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            res.json({ success: true, message: 'Rol eliminado correctamente' });
        } catch (error) {
            // Manejo de error por integridad referencial (si hay usuarios con este rol)
            if (error.code === '23503') {
                return res.status(400).json({ success: false, message: 'No se puede eliminar el rol porque tiene usuarios asociados' });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = RolesController;