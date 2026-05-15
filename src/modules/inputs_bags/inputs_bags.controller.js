const InputsBagsService = require('./inputs_bags.service');

const InputsBagsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsBagsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsBagsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsBagsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsBagsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsBagsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de bolsa eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsBagsController;