const express = require('express');
const router = express.Router();
const InputsCollarsController = require('./inputs_collars_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsCollarsSchema } = require('./inputs_collars_schema');

router.get('/', InputsCollarsController.getAll);
router.get('/:id', InputsCollarsController.getOne);
router.post('/', validateRequest(inputsCollarsSchema), InputsCollarsController.create);
router.put('/:id', validateRequest(inputsCollarsSchema), InputsCollarsController.update);
router.delete('/:id', InputsCollarsController.remove);

module.exports = router;