const express = require('express');
const router = express.Router();
const ReportsApprovedController = require('./reports_approved_controller');

router.get('/', ReportsApprovedController.getAll);
router.get('/:id', ReportsApprovedController.getOne);
router.post('/', ReportsApprovedController.create);
router.put('/:id', ReportsApprovedController.update);
router.delete('/:id', ReportsApprovedController.remove);

module.exports = router;