const express = require('express');
const router = express.Router();
const InspectionChemicalsController = require('./inspection_chemicals_controller');

router.get('/', InspectionChemicalsController.getAll);
router.get('/:id', InspectionChemicalsController.getOne);
router.post('/', InspectionChemicalsController.create);
router.put('/:id', InspectionChemicalsController.update);
router.delete('/:id', InspectionChemicalsController.remove);

module.exports = router;