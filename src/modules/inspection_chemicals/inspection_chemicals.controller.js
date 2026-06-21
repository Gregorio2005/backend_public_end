const InspectionChemicalsService = require('./inspection_chemicals.service');
const { notifyRole } = require('../../utils/notifications');

const InspectionChemicalsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionChemicalsService.getAll(req.query.bill_inputs_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InspectionChemicalsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InspectionChemicalsService.create(req.body);
            notifyRole(4, `Nueva inspección química requiere supervisión.`);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InspectionChemicalsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InspectionChemicalsService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección química eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionChemicalsController;