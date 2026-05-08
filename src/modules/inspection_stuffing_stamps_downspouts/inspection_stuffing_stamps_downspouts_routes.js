const express = require('express');
const router = express.Router();
const InspectionStuffingController = require('./inspection_stuffing_stamps_downspouts_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionStuffingSchema } = require('./inspection_stuffing_stamps_downspouts_schema');

router.get('/', InspectionStuffingController.getAll);
router.get('/:id', InspectionStuffingController.getOne);
router.post('/', validateRequest(inspectionStuffingSchema), InspectionStuffingController.create);
router.put('/:id', validateRequest(inspectionStuffingSchema), InspectionStuffingController.update);
router.delete('/:id', InspectionStuffingController.remove);

module.exports = router;