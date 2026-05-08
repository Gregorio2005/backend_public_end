const RolesService = require('./roles_service');

const RolesController = {
    getAll: async (req, res, next) => {
        try {
            const result = await RolesService.getAllRoles();
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const result = await RolesService.getRoleById(req.params.id);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name } = req.body;
            const result = await RolesService.createRole(name);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { name } = req.body;
            const result = await RolesService.updateRole(req.params.id, name);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await RolesService.deleteRole(req.params.id);
            res.json({ success: true, message: 'Rol eliminado correctamente' });
        } catch (error) {
            // Manejo específico de integridad referencial (Punto 5 de la ruta)
            if (error.code === '23503') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No se puede eliminar el rol porque tiene usuarios asociados' 
                });
            }
            next(error);
        }
    }
};

module.exports = RolesController;