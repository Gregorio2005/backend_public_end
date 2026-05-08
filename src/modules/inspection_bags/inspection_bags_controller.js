const InspectionBagsService = require('./inspection_bags_service');

const InspectionBagsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionBagsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InspectionBagsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InspectionBagsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InspectionBagsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InspectionBagsService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionBagsController;