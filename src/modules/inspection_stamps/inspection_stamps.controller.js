const InspectionStampsService = require('./inspection_stamps.service');

const InspectionStampsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionStampsService.getAll(req.query.bill_inputs_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InspectionStampsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InspectionStampsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InspectionStampsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InspectionStampsService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección de sello eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionStampsController;