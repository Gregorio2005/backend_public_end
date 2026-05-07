const express = require('express');
const router = express.Router();
const BillDataController = require('./bill_data_controller');

router.get('/', BillDataController.getAll);
router.get('/:id', BillDataController.getOne);
router.post('/', BillDataController.create);
router.put('/:id', BillDataController.update);
router.delete('/:id', BillDataController.remove);

module.exports = router;