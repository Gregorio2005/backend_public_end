const InputsCollarsService = require('./inputs_collars_service');

const InputsCollarsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsCollarsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsCollarsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsCollarsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsCollarsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsCollarsService.delete(req.params.id);
            res.json({ success: true, message: 'Registro eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsCollarsController;