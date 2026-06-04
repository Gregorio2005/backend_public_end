const express = require('express');
const router = express.Router();
const InputsOringController = require('./inputs_oring.controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsOringSchema } = require('./inputs_oring.schema');

router.get('/', InputsOringController.getAll);
router.get('/:id', InputsOringController.getOne);
router.post('/', validateRequest(inputsOringSchema), InputsOringController.create);
router.put('/:id', validateRequest(inputsOringSchema), InputsOringController.update);
router.delete('/:id', InputsOringController.remove);

module.exports = router;