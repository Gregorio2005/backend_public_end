const express = require('express');
const router = express.Router();
const InspectionCardboardController = require('./inspection_cardboard_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionCardboardSchema } = require('./inspection_cardboard_schema');

router.get('/', InspectionCardboardController.getAll);
router.get('/:id', InspectionCardboardController.getOne);
router.post('/', validateRequest(inspectionCardboardSchema), InspectionCardboardController.create);
router.put('/:id', validateRequest(inspectionCardboardSchema), InspectionCardboardController.update);
router.delete('/:id', InspectionCardboardController.remove);

module.exports = router;