const ApplicantsModel = require('./applicants.model');

const ApplicantsController = {
    /**
     * Obtiene y devuelve la lista de todos los postulantes.
     */
    getAllApplicants: async (req, res, next) => {
        try {
            const applicants = await ApplicantsModel.findAll();
            res.status(200).json({
                success: true,
                data: applicants,
                message: 'Lista de postulantes obtenida con éxito.'
            });
        } catch (error) {
            console.error("Error en ApplicantsController.getAllApplicants:", error);
            next(error); // Pasa el error al middleware de manejo de errores
        }
    },

    /**
     * Crea un nuevo registro de postulante desde el sitio web.
     */
    createApplicant: async (req, res, next) => {
        try {
            const newApplicant = await ApplicantsModel.create(req.body);
            res.status(201).json({
                success: true,
                data: newApplicant,
                message: 'Postulación enviada correctamente.'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Cambia el estado de un postulante.
     */
    updateStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updated = await ApplicantsModel.updateStatus(id, status);
            res.json({
                success: true,
                data: updated,
                message: 'Estado del postulante actualizado correctamente.'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ApplicantsController;