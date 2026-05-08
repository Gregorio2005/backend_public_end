const InspectionCamerasService = require('./inspection_cameras_service');

const InspectionCamerasController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InspectionCamerasService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InspectionCamerasService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InspectionCamerasService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InspectionCamerasService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InspectionCamerasService.delete(req.params.id);
            res.json({ success: true, message: 'Inspección eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InspectionCamerasController;