const ReportsRefusedService = require('./reports_refused.service');
const { notifyRole } = require('../../utils/notifications');

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
            // Notificar a Jefes de Calidad (rol 3)
            notifyRole(3, `Insumo rechazado registrado en el sistema.`);
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
            res.json({ success: true, message: 'Reporte de rechazo eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ReportsRefusedController;