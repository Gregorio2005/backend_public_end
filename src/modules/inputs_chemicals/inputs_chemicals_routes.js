const express = require('express');
const router = express.Router();
const InputsChemicalsController = require('./inputs_chemicals_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsChemicalsSchema } = require('./inputs_chemicals_schema');

router.get('/', InputsChemicalsController.getAll);
router.get('/:id', InputsChemicalsController.getOne);
router.post('/', validateRequest(inputsChemicalsSchema), InputsChemicalsController.create);
router.put('/:id', validateRequest(inputsChemicalsSchema), InputsChemicalsController.update);
router.delete('/:id', InputsChemicalsController.remove);

module.exports = router;