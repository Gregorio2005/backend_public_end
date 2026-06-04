const express = require('express');
const router = express.Router();
const InputsCardboardController = require('./inputs_cardboard.controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsCardboardSchema } = require('./inputs_cardboard.schema');

router.get('/', InputsCardboardController.getAll);
router.get('/:id', InputsCardboardController.getOne);
router.post('/', validateRequest(inputsCardboardSchema), InputsCardboardController.create);
router.put('/:id', validateRequest(inputsCardboardSchema), InputsCardboardController.update);
router.delete('/:id', InputsCardboardController.remove);

module.exports = router;