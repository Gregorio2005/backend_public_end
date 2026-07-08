const express = require('express');
const router = express.Router();
const ReportsApprovedController = require('./reports_approved.controller');
const { validateRequest } = require('../../middleware/validator');
const { reportsApprovedSchema } = require('./reports_approved.schema');

router.get('/', ReportsApprovedController.getAll);
router.get('/:id', ReportsApprovedController.getOne);
router.post('/', validateRequest(reportsApprovedSchema), ReportsApprovedController.create);
router.put('/increment', ReportsApprovedController.increment);
router.put('/:id', validateRequest(reportsApprovedSchema), ReportsApprovedController.update);
router.delete('/:id', ReportsApprovedController.remove);

module.exports = router;