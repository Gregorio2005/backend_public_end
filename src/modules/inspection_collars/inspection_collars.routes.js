const express = require('express');
const router = express.Router();
const InspectionCollarsController = require('./inspection_collars.controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionCollarsSchema } = require('./inspection_collars.schema');

router.get('/', InspectionCollarsController.getAll);
router.get('/:id', InspectionCollarsController.getOne);
router.post('/', validateRequest(inspectionCollarsSchema), InspectionCollarsController.create);
router.put('/:id', validateRequest(inspectionCollarsSchema), InspectionCollarsController.update);
router.delete('/:id', InspectionCollarsController.remove);

module.exports = router;