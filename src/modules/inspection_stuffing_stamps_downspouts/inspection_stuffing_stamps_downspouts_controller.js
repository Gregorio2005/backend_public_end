const InspectionStuffingService = require('./inspection_stuffing_stamps_downspouts_service');

const InspectionStuffingController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionStuffingService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InspectionStuffingService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InspectionStuffingService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InspectionStuffingService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InspectionStuffingService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionStuffingController;