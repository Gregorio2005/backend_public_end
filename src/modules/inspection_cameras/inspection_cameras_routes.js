const express = require('express');
const router = express.Router();
const InspectionCamerasController = require('./inspection_cameras_controller');

router.get('/', InspectionCamerasController.getAll);
router.get('/:id', InspectionCamerasController.getOne);
router.post('/', InspectionCamerasController.create);
router.put('/:id', InspectionCamerasController.update);
router.delete('/:id', InspectionCamerasController.remove);

module.exports = router;