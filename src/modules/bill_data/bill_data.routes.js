const express = require('express');
const router = express.Router();
const BillDataController = require('./bill_data.controller');
const { validateRequest } = require('../../middleware/validator');
const { billDataSchema } = require('./bill_data.schema');

router.get('/', BillDataController.getAll);
router.get('/:id', BillDataController.getOne);
router.post('/', validateRequest(billDataSchema), BillDataController.create);
router.put('/:id', validateRequest(billDataSchema), BillDataController.update);
router.delete('/:id', BillDataController.remove);

module.exports = router;