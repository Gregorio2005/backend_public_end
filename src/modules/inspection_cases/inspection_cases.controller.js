const InspectionCasesService = require('./inspection_cases.service');

const InspectionCasesController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionCasesService.getAll(req.query.bill_inputs_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InspectionCasesService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InspectionCasesService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InspectionCasesService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InspectionCasesService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionCasesController;