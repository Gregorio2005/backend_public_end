const express = require('express');
const router = express.Router();
const BillInputsController = require('./bill_inputs_controller');
const { validateRequest } = require('../../middleware/validator');
const { billInputsSchema } = require('./bill_inputs_schema');

router.get('/', BillInputsController.getAll);
router.get('/:id', BillInputsController.getOne);
router.post('/', validateRequest(billInputsSchema), BillInputsController.create);
router.put('/:id', validateRequest(billInputsSchema), BillInputsController.update);
router.delete('/:id', BillInputsController.remove);

module.exports = router;