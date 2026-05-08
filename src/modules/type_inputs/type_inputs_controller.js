const TypeInputsService = require('./type_inputs_service');

const TypeInputsController = {
    getAll: async (req, res, next) => {
        try {
            const result = await TypeInputsService.getAllTypes();
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const result = await TypeInputsService.getTypeById(req.params.id);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name } = req.body;
            const result = await TypeInputsService.createNewType(name);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { name } = req.body;
            const result = await TypeInputsService.updateType(req.params.id, name);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await TypeInputsService.deleteType(req.params.id);
            res.json({ success: true, message: 'Tipo de insumo eliminado correctamente' });
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No se puede eliminar: el tipo de insumo está siendo utilizado en el inventario maestro' 
                });
            }
            next(error);
        }
    }
};

module.exports = TypeInputsController;