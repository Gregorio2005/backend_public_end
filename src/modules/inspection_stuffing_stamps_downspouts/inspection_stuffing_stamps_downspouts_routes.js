const express = require('express');
const router = express.Router();
const InspectionStuffingController = require('./inspection_stuffing_stamps_downspouts_controller');

router.get('/', InspectionStuffingController.getAll);
router.get('/:id', InspectionStuffingController.getOne);
router.post('/', InspectionStuffingController.create);
router.put('/:id', InspectionStuffingController.update);
router.delete('/:id', InspectionStuffingController.remove);

module.exports = router;