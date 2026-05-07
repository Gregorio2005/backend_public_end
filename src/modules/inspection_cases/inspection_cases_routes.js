const express = require('express');
const router = express.Router();
const InspectionCasesController = require('./inspection_cases_controller');

router.get('/', InspectionCasesController.getAll);
router.get('/:id', InspectionCasesController.getOne);
router.post('/', InspectionCasesController.create);
router.put('/:id', InspectionCasesController.update);
router.delete('/:id', InspectionCasesController.remove);

module.exports = router;