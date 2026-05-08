const express = require('express');
const router = express.Router();
const InspectionThermoplasticsController = require('./inspection_thermoplastics_controller');
const { validateRequest } = require('../../middleware/validator');
const { inspectionThermoplasticsSchema } = require('./inspection_thermoplastics_schema');

router.get('/', InspectionThermoplasticsController.getAll);
router.get('/:id', InspectionThermoplasticsController.getOne);
router.post('/', validateRequest(inspectionThermoplasticsSchema), InspectionThermoplasticsController.create);
router.put('/:id', validateRequest(inspectionThermoplasticsSchema), InspectionThermoplasticsController.update);
router.delete('/:id', InspectionThermoplasticsController.remove);

module.exports = router;