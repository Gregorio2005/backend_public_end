const express = require('express');
const router = express.Router();
const ReportsRefusedController = require('./reports_refused.controller');
const { validateRequest } = require('../../middleware/validator');
const { reportsRefusedSchema } = require('./reports_refused.schema');

router.get('/', ReportsRefusedController.getAll);
router.get('/:id', ReportsRefusedController.getOne);
router.post('/', validateRequest(reportsRefusedSchema), ReportsRefusedController.create);
router.put('/increment', ReportsRefusedController.increment);
router.put('/:id', validateRequest(reportsRefusedSchema), ReportsRefusedController.update);
router.delete('/:id', ReportsRefusedController.remove);

module.exports = router;