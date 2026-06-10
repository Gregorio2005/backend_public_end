const MasterInputsService = require('./master_inputs.service');

const MasterInputsController = {
    getAll: async (req, res, next) => {
        try {
            const { suppliers_id } = req.query; // Extrae suppliers_id de los parámetros de consulta
            const data = await MasterInputsService.getAll(suppliers_id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const data = await MasterInputsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = await MasterInputsService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = await MasterInputsService.update(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await MasterInputsService.delete(req.params.id);
            res.json({ success: true, message: 'Registro maestro eliminado correctamente' });
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).json({
                    success: false,
                    message: 'No se puede eliminar el registro porque tiene facturas de insumos (bill_inputs) asociadas'
                });
            }
            next(error);
        }
    }
};

module.exports = MasterInputsController;