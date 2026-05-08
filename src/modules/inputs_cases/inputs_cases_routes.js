const express = require('express');
const router = express.Router();
const InputsCasesController = require('./inputs_cases_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsCasesSchema } = require('./inputs_cases_schema');

router.get('/', InputsCasesController.getAll);
router.get('/:id', InputsCasesController.getOne);
router.post('/', validateRequest(inputsCasesSchema), InputsCasesController.create);
router.put('/:id', validateRequest(inputsCasesSchema), InputsCasesController.update);
router.delete('/:id', InputsCasesController.remove);

module.exports = router;