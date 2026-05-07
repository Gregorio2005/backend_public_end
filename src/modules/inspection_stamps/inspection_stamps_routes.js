const express = require('express');
const router = express.Router();
const InspectionStampsController = require('./inspection_stamps_controller');

router.get('/', InspectionStampsController.getAll);
router.get('/:id', InspectionStampsController.getOne);
router.post('/', InspectionStampsController.create);
router.put('/:id', InspectionStampsController.update);
router.delete('/:id', InspectionStampsController.remove);

module.exports = router;