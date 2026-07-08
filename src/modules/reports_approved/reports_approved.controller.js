const ReportsApprovedService = require('./reports_approved.service');

const ReportsApprovedController = {
    getAll: async (req, res, next) => {
        try {
            const data = await ReportsApprovedService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await ReportsApprovedService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await ReportsApprovedService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await ReportsApprovedService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await ReportsApprovedService.delete(req.params.id);
            res.json({ success: true, message: 'Reporte de aprobación eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    },

    increment: async (req, res, next) => {
        try {
            const { bill_data_id, quantity } = req.body;
            const data = await ReportsApprovedService.incrementQuantity(bill_data_id, quantity);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ReportsApprovedController;