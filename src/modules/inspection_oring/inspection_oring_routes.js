const express = require('express');
const router = express.Router();
const InspectionOringController = require('./inspection_oring_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionOringSchema } = require('./inspection_oring_schema');

router.get('/', InspectionOringController.getAll);
router.get('/:id', InspectionOringController.getOne);
router.post('/', validateRequest(inspectionOringSchema), InspectionOringController.create);
router.put('/:id', validateRequest(inspectionOringSchema), InspectionOringController.update);
router.delete('/:id', InspectionOringController.remove);

module.exports = router;