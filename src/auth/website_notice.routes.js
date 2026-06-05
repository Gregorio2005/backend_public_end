const express = require('express');
const router = express.Router();
const WebsiteNoticeController = require('./website_notice.controller');
const { verifyToken } = require('./auth'); // Asumiendo que verifyToken está en auth.js en la misma carpeta
const { isAdmin } = require('../middleware/roleAuth'); // Asumiendo que isAdmin está en middleware/roleAuth.js
const { validateRequest } = require('../middleware/validator'); // Asumiendo que validator está en middleware/validator.js
const { createWebsiteNoticeSchema } = require('./website_notice.schema');

/**
 * @route POST /api/website-notice
 * @description Crea un nuevo aviso web.
 * @access Private (Admin only)
 */
router.get('/', WebsiteNoticeController.getNotices);

/**
 * @route GET /api/website-notice/:id
 * @description Busca un aviso específico por su ID.
 * @access Private (Requerido para el Panel Admin)
 */
router.get('/:id', verifyToken, WebsiteNoticeController.getNoticeById);

/**
 * @route PUT /api/website-notice/:id/publish
 * @description Marca un aviso como activo (status = true).
 * @access Private (Admin only)
 */
router.put('/:id/publish', verifyToken, isAdmin, WebsiteNoticeController.publishNotice);

router.post(
    '/',
    verifyToken,
    isAdmin,
    validateRequest(createWebsiteNoticeSchema),
    WebsiteNoticeController.createWebsiteNotice
);

module.exports = router;