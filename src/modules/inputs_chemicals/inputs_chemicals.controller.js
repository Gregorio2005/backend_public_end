const InputsChemicalsService = require('./inputs_chemicals.service');

const InputsChemicalsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsChemicalsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InputsChemicalsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InputsChemicalsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InputsChemicalsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InputsChemicalsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo químico eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsChemicalsController;