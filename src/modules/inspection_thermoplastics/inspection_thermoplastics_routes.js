const express = require('express');
const router = express.Router();
const InspectionThermoplasticsController = require('./inspection_thermoplastics_controller');

router.get('/', InspectionThermoplasticsController.getAll);
router.get('/:id', InspectionThermoplasticsController.getOne);
router.post('/', InspectionThermoplasticsController.create);
router.put('/:id', InspectionThermoplasticsController.update);
router.delete('/:id', InspectionThermoplasticsController.remove);

module.exports = router;