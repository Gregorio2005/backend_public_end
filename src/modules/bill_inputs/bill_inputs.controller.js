const BillInputsService = require('./bill_inputs.service');

const BillInputsController = {
    getAll: async (req, res, next) => {
        try {
            const data = await BillInputsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await BillInputsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await BillInputsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await BillInputsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await BillInputsService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo eliminado de la factura correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = BillInputsController;