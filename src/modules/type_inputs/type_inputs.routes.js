const express = require('express');
const router = express.Router();
const TypeInputsController = require('./type_inputs.controller');
const { validateRequest } = require('../../middleware/validator');
const { typeInputsSchema } = require('./type_inputs.schema');

router.get('/', TypeInputsController.getAll);
router.get('/:id/inputs', TypeInputsController.getInputsByType);
router.get('/:id', TypeInputsController.getOne);
router.post('/', validateRequest(typeInputsSchema), TypeInputsController.create);
router.put('/:id', validateRequest(typeInputsSchema), TypeInputsController.update);
router.delete('/:id', TypeInputsController.remove);

module.exports = router;