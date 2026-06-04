const InputsThermoplasticsService = require('./inputs_thermoplastics.service');

const InputsThermoplasticsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsThermoplasticsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsThermoplasticsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsThermoplasticsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsThermoplasticsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsThermoplasticsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo termoplástico eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsThermoplasticsController;