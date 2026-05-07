const express = require('express');
const router = express.Router();
const InspectionCollarsController = require('./inspection_collars_controller');

router.get('/', InspectionCollarsController.getAll);
router.get('/:id', InspectionCollarsController.getOne);
router.post('/', InspectionCollarsController.create);
router.put('/:id', InspectionCollarsController.update);
router.delete('/:id', InspectionCollarsController.remove);

module.exports = router;