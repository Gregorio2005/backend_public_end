const ReportsRefusedService = require('./reports_refused_service');

const ReportsRefusedController = {
    getAll: async (req, res, next) => {
        try {
            const data = await ReportsRefusedService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await ReportsRefusedService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await ReportsRefusedService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await ReportsRefusedService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await ReportsRefusedService.delete(req.params.id);
            res.json({ success: true, message: 'Reporte de rechazo eliminado' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ReportsRefusedController;