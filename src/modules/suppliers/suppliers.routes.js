const express = require('express');
const router = express.Router();
const SuppliersController = require('./suppliers.controller');
const { validateRequest } = require('../../middleware/validator');
const { supplierSchema } = require('./suppliers.schema');

router.get('/', SuppliersController.getAll);
router.get('/:id', SuppliersController.getOne);
router.post('/', validateRequest(supplierSchema), SuppliersController.create);
router.put('/:id', validateRequest(supplierSchema), SuppliersController.update);
router.delete('/:id', SuppliersController.remove);

module.exports = router;