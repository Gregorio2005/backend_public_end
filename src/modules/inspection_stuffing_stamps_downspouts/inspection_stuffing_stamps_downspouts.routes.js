const express = require('express');
const router = express.Router();
const InspectionStuffingStampsDownspoutsController = require('./inspection_stuffing_stamps_downspouts.controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionStuffingStampsDownspoutsSchema } = require('./inspection_stuffing_stamps_downspouts.schema');

router.get('/', InspectionStuffingStampsDownspoutsController.getAll);
router.get('/:id', InspectionStuffingStampsDownspoutsController.getOne);
router.post('/', validateRequest(inspectionStuffingStampsDownspoutsSchema), InspectionStuffingStampsDownspoutsController.create);
router.put('/:id', validateRequest(inspectionStuffingStampsDownspoutsSchema), InspectionStuffingStampsDownspoutsController.update);
router.delete('/:id', InspectionStuffingStampsDownspoutsController.remove);

module.exports = router;