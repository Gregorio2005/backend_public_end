const InspectionThermoplasticsService = require('./inspection_thermoplastics.service');

const InspectionThermoplasticsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionThermoplasticsService.getAll(req.query.bill_inputs_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const data = await InspectionThermoplasticsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await InspectionThermoplasticsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await InspectionThermoplasticsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            await InspectionThermoplasticsService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección termoplástica eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionThermoplasticsController;