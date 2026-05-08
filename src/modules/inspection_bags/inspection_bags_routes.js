const express = require('express');
const router = express.Router();
const InspectionBagsController = require('./inspection_bags_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionBagsSchema } = require('./inspection_bags_schema');

router.get('/', InspectionBagsController.getAll);
router.get('/:id', InspectionBagsController.getOne);
router.post('/', validateRequest(inspectionBagsSchema), InspectionBagsController.create);
router.put('/:id', validateRequest(inspectionBagsSchema), InspectionBagsController.update);
router.delete('/:id', InspectionBagsController.remove);

module.exports = router;