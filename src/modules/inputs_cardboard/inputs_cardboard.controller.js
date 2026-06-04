const InputsCardboardService = require('./inputs_cardboard.service');

const InputsCardboardController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsCardboardService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsCardboardService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsCardboardService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsCardboardService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsCardboardService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de cartón eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsCardboardController;