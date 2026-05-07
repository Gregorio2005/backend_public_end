const express = require('express');
const router = express.Router();
const BillInputsController = require('./bill_inputs_controller');

router.get('/', BillInputsController.getAll);
router.get('/:id', BillInputsController.getOne);
router.get('/bill/:billId', BillInputsController.getByBill);
router.post('/', BillInputsController.create);
router.put('/:id', BillInputsController.update);
router.delete('/:id', BillInputsController.remove);

module.exports = router;