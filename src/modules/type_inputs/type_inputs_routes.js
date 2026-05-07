const express = require('express');
const router = express.Router();
const TypeInputsController = require('./type_inputs_controller');

router.get('/', TypeInputsController.getAll);
router.get('/:id', TypeInputsController.getOne);
router.post('/', TypeInputsController.create);
router.put('/:id', TypeInputsController.update);
router.delete('/:id', TypeInputsController.remove);

module.exports = router;