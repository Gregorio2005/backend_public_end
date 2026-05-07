const express = require('express');
const router = express.Router();
const InspectionBagsController = require('./inspection_bags_controller');

router.get('/', InspectionBagsController.getAll);
router.get('/:id', InspectionBagsController.getOne);
router.post('/', InspectionBagsController.create);
router.put('/:id', InspectionBagsController.update);
router.delete('/:id', InspectionBagsController.remove);

module.exports = router;