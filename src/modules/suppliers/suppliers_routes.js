const express = require('express');
const router = express.Router();
const SuppliersController = require('./suppliers_controller');

router.get('/', SuppliersController.getAll);
router.get('/:id', SuppliersController.getOne);
router.post('/', SuppliersController.create);
router.put('/:id', SuppliersController.update);
router.delete('/:id', SuppliersController.remove);

module.exports = router;