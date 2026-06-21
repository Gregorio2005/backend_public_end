const InspectionStuffingStampsDownspoutsService = require('./inspection_stuffing_stamps_downspouts.service');
const { notifyRole } = require('../../utils/notifications');

const InspectionStuffingStampsDownspoutsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionStuffingStampsDownspoutsService.getAll(req.query.bill_inputs_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InspectionStuffingStampsDownspoutsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InspectionStuffingStampsDownspoutsService.create(req.body);
            notifyRole(4, `Nueva inspección de empaquetadura requiere supervisión.`);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InspectionStuffingStampsDownspoutsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InspectionStuffingStampsDownspoutsService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección de empaquetadura eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionStuffingStampsDownspoutsController;