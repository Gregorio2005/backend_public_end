const ProfilePhotoService = require('./profile_photo.service');
const cloudinary = require('../../config/cloudinary');
const { notifyRole } = require('../../utils/notifications');

const ProfilePhotoController = {
    /**
     * Sube foto de perfil del usuario autenticado.
     * La foto queda pendiente de aprobación por el admin.
     */
    uploadPhoto: async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No se proporcionó ninguna imagen.' });
            }

            // Subir a Cloudinary como buffer
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'profile_photos',
                        transformation: [
                            { width: 400, height: 400, crop: 'limit' },
                            { quality: 'auto' }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            // Actualizar en BD
            const updated = await ProfilePhotoService.updatePhoto(req.user.id, result.secure_url);

            // Notificar a todos los admins (rol 1)
            const user = req.user;
            notifyRole(1, `${user.user || 'Un usuario'} ha subido una nueva foto de perfil pendiente de aprobación.`);

            res.json({
                success: true,
                data: updated,
                message: 'Foto subida correctamente. Pendiente de aprobación por el administrador.'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Aprueba la foto de perfil de un usuario (solo admin).
     */
    approvePhoto: async (req, res, next) => {
        try {
            const data = await ProfilePhotoService.approvePhoto(req.params.id);
            res.json({ success: true, data, message: 'Foto aprobada correctamente.' });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Rechaza la foto de perfil de un usuario (solo admin).
     * Elimina la imagen de Cloudinary y limpia la URL.
     */
    rejectPhoto: async (req, res, next) => {
        try {
            // Obtener URL actual para eliminar de Cloudinary
            const current = await ProfilePhotoService.getPhotoStatus(req.params.id);
            if (current && current.url_perfil_photo) {
                // Extraer public_id de la URL de Cloudinary
                const parts = current.url_perfil_photo.split('/');
                const folderAndFile = parts.slice(parts.indexOf('profile_photos')).join('/');
                const publicId = folderAndFile.replace(/\.[^.]+$/, '');
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (e) {
                    console.error('Error al eliminar imagen de Cloudinary:', e.message);
                }
            }

            const data = await ProfilePhotoService.rejectPhoto(req.params.id);
            res.json({ success: true, data, message: 'Foto rechazada y eliminada.' });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Obtiene usuarios con foto pendiente de aprobación (solo admin).
     */
    getPendingPhotos: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const result = await ProfilePhotoService.getPendingPhotos({ page, limit });
            res.json({ success: true, ...result });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ProfilePhotoController;
