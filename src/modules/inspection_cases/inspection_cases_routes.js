const express = require('express');
const router = express.Router();
const InspectionCasesController = require('./inspection_cases_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionCasesSchema } = require('./inspection_cases_schema');

router.get('/', InspectionCasesController.getAll);
router.get('/:id', InspectionCasesController.getOne);
router.post('/', validateRequest(inspectionCasesSchema), InspectionCasesController.create);
router.put('/:id', validateRequest(inspectionCasesSchema), InspectionCasesController.update);
router.delete('/:id', InspectionCasesController.remove);

module.exports = router;