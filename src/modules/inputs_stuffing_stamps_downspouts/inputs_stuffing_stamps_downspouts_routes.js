const express = require('express');
const router = express.Router();
const InputsStuffingController = require('./inputs_stuffing_stamps_downspouts_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsStuffingSchema } = require('./inputs_stuffing_stamps_downspouts_schema');

router.get('/', InputsStuffingController.getAll);
router.get('/:id', InputsStuffingController.getOne);
router.post('/', validateRequest(inputsStuffingSchema), InputsStuffingController.create);
router.put('/:id', validateRequest(inputsStuffingSchema), InputsStuffingController.update);
router.delete('/:id', InputsStuffingController.remove);

module.exports = router;