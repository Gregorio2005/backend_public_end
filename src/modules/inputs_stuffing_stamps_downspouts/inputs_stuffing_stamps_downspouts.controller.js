const InputsStuffingStampsDownspoutsService = require('./inputs_stuffing_stamps_downspouts.service');

const InputsStuffingStampsDownspoutsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsStuffingStampsDownspoutsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsStuffingStampsDownspoutsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsStuffingStampsDownspoutsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsStuffingStampsDownspoutsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsStuffingStampsDownspoutsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de empaquetadura eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsStuffingStampsDownspoutsController;