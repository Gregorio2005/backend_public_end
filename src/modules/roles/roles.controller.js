const RolesService = require('./roles.service');

const RolesController = {
    getAll: async (req, res, next) => {
        try {
            const data = await RolesService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await RolesService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await RolesService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await RolesService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await RolesService.delete(req.params.id);
            res.json({ success: true, message: 'Rol eliminado correctamente' });
        } catch (error) {
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