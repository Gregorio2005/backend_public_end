const express = require('express');
const router = express.Router();
const InspectionCamerasController = require('./inspection_cameras.controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionCamerasSchema } = require('./inspection_cameras.schema');

router.get('/', InspectionCamerasController.getAll);
router.get('/:id', InspectionCamerasController.getOne);
router.post('/', validateRequest(inspectionCamerasSchema), InspectionCamerasController.create);
router.put('/:id', validateRequest(inspectionCamerasSchema), InspectionCamerasController.update);
router.delete('/:id', InspectionCamerasController.remove);

module.exports = router;