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

router.post(
    '/',
    verifyToken,
    isAdmin,
    validateRequest(createWebsiteNoticeSchema),
    WebsiteNoticeController.createWebsiteNotice
);

module.exports = router;