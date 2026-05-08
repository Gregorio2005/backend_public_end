const InputsOringService = require('./inputs_oring_service');

const InputsOringController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsOringService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InputsOringService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InputsOringService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InputsOringService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InputsOringService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo Oring eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsOringController;