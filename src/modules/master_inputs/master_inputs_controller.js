const MasterInputsService = require('./master_inputs_service');

const MasterInputsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await MasterInputsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await MasterInputsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await MasterInputsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await MasterInputsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await MasterInputsService.delete(req.params.id);
            res.json({ success: true, message: 'Registro eliminado del maestro' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = MasterInputsController;