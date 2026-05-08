const InputsStuffingService = require('./inputs_stuffing_stamps_downspouts_service');

const InputsStuffingController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsStuffingService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InputsStuffingService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InputsStuffingService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InputsStuffingService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InputsStuffingService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsStuffingController;