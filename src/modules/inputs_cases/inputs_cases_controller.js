const InputsCasesService = require('./inputs_cases_service');

const InputsCasesController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsCasesService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InputsCasesService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InputsCasesService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InputsCasesService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InputsCasesService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de estuche eliminado' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsCasesController;