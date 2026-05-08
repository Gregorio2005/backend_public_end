const express = require('express');
const router = express.Router();
const InputsStampsController = require('./inputs_stamps_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsStampsSchema } = require('./inputs_stamps_schema');

router.get('/', InputsStampsController.getAll);
router.get('/:id', InputsStampsController.getOne);
router.post('/', validateRequest(inputsStampsSchema), InputsStampsController.create);
router.put('/:id', validateRequest(inputsStampsSchema), InputsStampsController.update);
router.delete('/:id', InputsStampsController.remove);

module.exports = router;