const express = require('express');
const router = express.Router();
const InspectionOringController = require('./inspection_oring_controller');

router.get('/', InspectionOringController.getAll);
router.get('/:id', InspectionOringController.getOne);
router.post('/', InspectionOringController.create);
router.put('/:id', InspectionOringController.update);
router.delete('/:id', InspectionOringController.remove);

module.exports = router;