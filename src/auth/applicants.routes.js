const express = require('express');
const router = express.Router();
const ApplicantsController = require('./applicants.controller');
const { verifyToken } = require('./auth');
const upload = require('../middleware/upload');
const { validateRequest } = require('../middleware/validator');
const { applicantUpdateSchema } = require('./applicants.schema');

/**
 * @route GET /api/applicants
 * @description Obtiene todos los postulantes registrados.
 * @access Private (requiere token JWT)
 */
router.get('/', verifyToken, ApplicantsController.getAllApplicants);

/**
 * @route GET /api/applicants/:id
 * @description Obtiene un postulante por ID.
 * @access Private
 */
router.get('/:id', verifyToken, ApplicantsController.getApplicantById);

/**
 * @route GET /api/applicants/:id/cv
 * @description Sirve el CV (PDF) de un postulante.
 * @access Private
 */
router.get('/:id/cv', verifyToken, ApplicantsController.getCv);

/**
 * @route POST /api/applicants
 * @description Crea una nueva postulación con CV opcional.
 * @access Public
 */
router.post('/', upload.single('cv'), ApplicantsController.createApplicant);

/**
 * @route PUT /api/applicants/:id
 * @description Actualiza postulante completo (entrevistas, status derivado).
 * @access Private
 */
router.put('/:id', verifyToken, validateRequest(applicantUpdateSchema), ApplicantsController.updateApplicant);

/**
 * @route PUT /api/applicants/:id/discard
 * @description Descarta un postulante (status = 'Descartado').
 * @access Private
 */
router.put('/:id/discard', verifyToken, ApplicantsController.discardApplicant);

/**
 * @route PUT /api/applicants/:id/hire
 * @description Contrata un postulante (status = 'Contratado').
 * @access Private
 */
router.put('/:id/hire', verifyToken, ApplicantsController.hireApplicant);

/**
 * @route DELETE /api/applicants/:id
 * @description Elimina un postulante y su CV.
 * @access Private
 */
router.delete('/:id', verifyToken, ApplicantsController.removeApplicant);

module.exports = router;
