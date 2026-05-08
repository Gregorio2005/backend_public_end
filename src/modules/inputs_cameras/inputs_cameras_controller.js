const InputsCamerasService = require('./inputs_cameras_service');

const InputsCamerasController = {
    getAll: async (req, res, next) => {
        try {
            const data = await InputsCamerasService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await InputsCamerasService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await InputsCamerasService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await InputsCamerasService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await InputsCamerasService.delete(req.params.id);
            res.json({ success: true, message: 'Insumo de cámara eliminado' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = InputsCamerasController;