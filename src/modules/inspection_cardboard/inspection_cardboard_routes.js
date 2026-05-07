const express = require('express');
const router = express.Router();
const InspectionCardboardController = require('./inspection_cardboard_controller');

router.get('/', InspectionCardboardController.getAll);
router.get('/:id', InspectionCardboardController.getOne);
router.post('/', InspectionCardboardController.create);
router.put('/:id', InspectionCardboardController.update);
router.delete('/:id', InspectionCardboardController.remove);

module.exports = router;