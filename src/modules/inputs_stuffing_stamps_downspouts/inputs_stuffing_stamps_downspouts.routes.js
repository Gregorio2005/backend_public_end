const express = require('express');
const router = express.Router();
const InputsStuffingStampsDownspoutsController = require('./inputs_stuffing_stamps_downspouts.controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsStuffingStampsDownspoutsSchema } = require('./inputs_stuffing_stamps_downspouts.schema');

router.get('/', InputsStuffingStampsDownspoutsController.getAll);
router.get('/:id', InputsStuffingStampsDownspoutsController.getOne);
router.post('/', validateRequest(inputsStuffingStampsDownspoutsSchema), InputsStuffingStampsDownspoutsController.create);
router.put('/:id', validateRequest(inputsStuffingStampsDownspoutsSchema), InputsStuffingStampsDownspoutsController.update);
router.delete('/:id', InputsStuffingStampsDownspoutsController.remove);

module.exports = router;