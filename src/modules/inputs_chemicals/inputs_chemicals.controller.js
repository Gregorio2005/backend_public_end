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
            // Priorizamos el ID del usuario autenticado en el token
            const data = await InputsChemicalsService.create({
                reference: req.body.reference,
                user_id: req.user?.id || req.body.user_id
            });
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InputsChemicalsService.update(req.params.id, {
                reference: req.body.reference
            });
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