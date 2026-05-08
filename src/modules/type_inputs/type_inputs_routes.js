const express = require('express');
const router = express.Router();
const TypeInputsController = require('./type_inputs_controller');
const { validateRequest } = require('../../middleware/validator');
const { typeInputSchema } = require('./type_inputs_schema');

router.get('/', TypeInputsController.getAll);
router.get('/:id', TypeInputsController.getOne);
router.post('/', validateRequest(typeInputSchema), TypeInputsController.create);
router.put('/:id', validateRequest(typeInputSchema), TypeInputsController.update);
router.delete('/:id', TypeInputsController.remove);

module.exports = router;