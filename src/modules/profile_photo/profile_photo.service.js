const ProfilePhotoModel = require('./profile_photo.model');

const ProfilePhotoService = {
    getPhotoStatus: (userId) => ProfilePhotoModel.getPhotoStatus(userId),
    updatePhoto: (userId, url) => ProfilePhotoModel.updatePhoto(userId, url),
    approvePhoto: async (userId) => {
        const result = await ProfilePhotoModel.approvePhoto(userId);
        if (!result) throw new Error('Usuario no encontrado');
        return result;
    },
    rejectPhoto: async (userId) => {
        const result = await ProfilePhotoModel.rejectPhoto(userId);
        if (!result) throw new Error('Usuario no encontrado');
        return result;
    },
    getPendingPhotos: (params) => ProfilePhotoModel.getPendingPhotos(params)
};

module.exports = ProfilePhotoService;
