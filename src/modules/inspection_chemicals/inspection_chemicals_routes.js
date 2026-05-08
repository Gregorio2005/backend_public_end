const express = require('express');
const router = express.Router();
const InspectionChemicalsController = require('./inspection_chemicals_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionChemicalsSchema } = require('./inspection_chemicals_schema');

router.get('/', InspectionChemicalsController.getAll);
router.get('/:id', InspectionChemicalsController.getOne);
router.post('/', validateRequest(inspectionChemicalsSchema), InspectionChemicalsController.create);
router.put('/:id', validateRequest(inspectionChemicalsSchema), InspectionChemicalsController.update);
router.delete('/:id', InspectionChemicalsController.remove);

module.exports = router;