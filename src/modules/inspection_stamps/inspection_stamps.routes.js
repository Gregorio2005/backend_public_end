const express = require('express');
const router = express.Router();
const InspectionStampsController = require('./inspection_stamps.controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionStampsSchema } = require('./inspection_stamps.schema');

router.get('/', InspectionStampsController.getAll);
router.get('/:id', InspectionStampsController.getOne);
router.post('/', validateRequest(inspectionStampsSchema), InspectionStampsController.create);
router.put('/:id', validateRequest(inspectionStampsSchema), InspectionStampsController.update);
router.delete('/:id', InspectionStampsController.remove);

module.exports = router;