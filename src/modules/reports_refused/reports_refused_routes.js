const express = require('express');
const router = express.Router();
const ReportsRefusedController = require('./reports_refused_controller');

router.get('/', ReportsRefusedController.getAll);
router.get('/:id', ReportsRefusedController.getOne);
router.post('/', ReportsRefusedController.create);
router.put('/:id', ReportsRefusedController.update);
router.delete('/:id', ReportsRefusedController.remove);

module.exports = router;