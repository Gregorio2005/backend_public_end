const express = require('express');
const router = express.Router();
const NotificacionesController = require('./notifications.controller');
const { verifyToken } = require('../../auth/auth');

router.get('/', verifyToken, NotificacionesController.getAll);
router.get('/unread-count', verifyToken, NotificacionesController.getUnreadCount);
router.put('/read-all', verifyToken, NotificacionesController.markAllAsRead);
router.put('/:id/read', verifyToken, NotificacionesController.markAsRead);

module.exports = router;
