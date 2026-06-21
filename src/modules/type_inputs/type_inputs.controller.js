const TypeInputsService = require('./type_inputs.service');

const TypeInputsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await TypeInputsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await TypeInputsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getInputsByType: async (req, res, next) => {
        try {
            const typeId = parseInt(req.params.id, 10);
            if (isNaN(typeId)) {
                return res.status(400).json({ success: false, message: 'El ID del tipo debe ser un número válido' });
            }
            const data = await TypeInputsService.getInputsByTypeId(typeId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await TypeInputsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await TypeInputsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await TypeInputsService.delete(req.params.id);
            res.json({ success: true, message: 'Tipo de insumo eliminado correctamente' });
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No se puede eliminar porque existen registros maestros (master_inputs) asociados' 
                });
            }
            next(error);
        }
    }
};

module.exports = TypeInputsController;