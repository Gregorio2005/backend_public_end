const express = require('express');
const router = express.Router();
const ApplicantsController = require('./applicants.controller');
const { verifyToken } = require('./auth'); // Al estar en la misma carpeta src/auth, se usa ./auth

/**
 * @route GET /api/applicants
 * @description Obtiene todos los postulantes registrados.
 * @access Private (requiere token JWT)
 */
router.get('/', verifyToken, ApplicantsController.getAllApplicants);

/**
 * @route POST /api/applicants
 * @description Crea una nueva postulación.
 * @access Public
 */
router.post('/', ApplicantsController.createApplicant);

/**
 * @route PUT /api/applicants/:id/status
 * @description Actualiza el estado de un postulante.
 * @access Private
 */
router.put('/:id/status', verifyToken, ApplicantsController.updateStatus);

module.exports = router;