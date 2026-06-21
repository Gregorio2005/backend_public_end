const express = require('express');
const router = express.Router();
const ProfilePhotoController = require('./profile_photo.controller');
const { verifyToken } = require('../../auth/auth');
const { isAdmin } = require('../../middleware/roleAuth');
const uploadPhoto = require('../../middleware/uploadPhoto');

// Usuario sube su foto (requiere auth + archivo imagen)
router.put('/photo', verifyToken, uploadPhoto.single('photo'), ProfilePhotoController.uploadPhoto);

// Admin: fotos pendientes de aprobación
router.get('/pending', verifyToken, isAdmin, ProfilePhotoController.getPendingPhotos);

// Admin: aprobar/rechazar foto
router.put('/:id/approve', verifyToken, isAdmin, ProfilePhotoController.approvePhoto);
router.put('/:id/reject', verifyToken, isAdmin, ProfilePhotoController.rejectPhoto);

module.exports = router;
