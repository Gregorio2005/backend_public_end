const BillDataService = require('./bill_data_service');

const BillDataController = {
    getAll: async (req, res, next) => {
        try {
            const data = await BillDataService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await BillDataService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await BillDataService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await BillDataService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await BillDataService.delete(req.params.id);
            res.json({ success: true, message: 'Factura eliminada' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = BillDataController;