const express = require('express');
const router = express.Router();
const InputsThermoplasticsController = require('./inputs_thermoplastics_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsThermoplasticsSchema } = require('./inputs_thermoplastics_schema');

router.get('/', InputsThermoplasticsController.getAll);
router.get('/:id', InputsThermoplasticsController.getOne);
router.post('/', validateRequest(inputsThermoplasticsSchema), InputsThermoplasticsController.create);
router.put('/:id', validateRequest(inputsThermoplasticsSchema), InputsThermoplasticsController.update);
router.delete('/:id', InputsThermoplasticsController.remove);

module.exports = router;