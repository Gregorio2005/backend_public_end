const WebsiteProductsService = require('./website_products.service');
const cloudinary = require('../../config/cloudinary');

const WebsiteProductsController = {
    getActive: async (req, res, next) => {
        try {
            const data = await WebsiteProductsService.getActive();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const data = await WebsiteProductsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const data = await WebsiteProductsService.getById(req.params.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No se proporcionó ninguna imagen.' });
            }

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'website_products',
                        transformation: [
                            { width: 600, height: 400, crop: 'limit' },
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

            const productData = {
                name: req.body.name,
                description: req.body.description,
                image_url: result.secure_url,
                display_order: Number(req.body.display_order),
                status: req.body.status
            };

            const data = await WebsiteProductsService.create(productData);
            res.status(201).json({ success: true, data, message: 'Producto creado correctamente.' });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const existing = await WebsiteProductsService.getById(req.params.id);

            let imageUrl = existing.image_url;

            if (req.file) {
                if (existing.image_url) {
                    const parts = existing.image_url.split('/');
                    const folderAndFile = parts.slice(parts.indexOf('website_products')).join('/');
                    const publicId = folderAndFile.replace(/\.[^.]+$/, '');
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (e) {
                        console.error('Error al eliminar imagen anterior de Cloudinary:', e.message);
                    }
                }

                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'website_products',
                            transformation: [
                                { width: 600, height: 400, crop: 'limit' },
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

                imageUrl = result.secure_url;
            }

            const productData = {
                name: req.body.name,
                description: req.body.description,
                image_url: imageUrl,
                display_order: Number(req.body.display_order),
                status: req.body.status
            };

            const data = await WebsiteProductsService.update(req.params.id, productData);
            res.json({ success: true, data, message: 'Producto actualizado correctamente.' });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            const existing = await WebsiteProductsService.getById(req.params.id);

            if (existing.image_url) {
                const parts = existing.image_url.split('/');
                const folderAndFile = parts.slice(parts.indexOf('website_products')).join('/');
                const publicId = folderAndFile.replace(/\.[^.]+$/, '');
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (e) {
                    console.error('Error al eliminar imagen de Cloudinary:', e.message);
                }
            }

            await WebsiteProductsService.delete(req.params.id);
            res.json({ success: true, message: 'Producto eliminado correctamente.' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = WebsiteProductsController;
