const InputsStampsService = require('./inputs_stamps.service');

const InputsStampsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsStampsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsStampsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsStampsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsStampsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsStampsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de sello eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsStampsController;