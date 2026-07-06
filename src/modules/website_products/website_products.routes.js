const express = require('express');
const router = express.Router();
const WebsiteProductsController = require('./website_products.controller');
const { verifyToken } = require('../../auth/auth');
const { isAdmin } = require('../../middleware/roleAuth');
const { validateRequest } = require('../../middleware/validator');
const { websiteProductSchema } = require('./website_products.schema');
const uploadPhoto = require('../../middleware/uploadPhoto');

router.get('/', WebsiteProductsController.getActive);
router.get('/all', verifyToken, isAdmin, WebsiteProductsController.getAll);
router.get('/:id', verifyToken, isAdmin, WebsiteProductsController.getById);
router.post('/', verifyToken, isAdmin, uploadPhoto.single('image'), validateRequest(websiteProductSchema), WebsiteProductsController.create);
router.put('/:id', verifyToken, isAdmin, uploadPhoto.single('image'), validateRequest(websiteProductSchema), WebsiteProductsController.update);
router.delete('/:id', verifyToken, isAdmin, WebsiteProductsController.remove);

module.exports = router;
