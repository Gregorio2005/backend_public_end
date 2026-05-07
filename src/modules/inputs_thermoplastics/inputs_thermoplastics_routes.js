const express = require('express');
const router = express.Router();
const InputsThermoplasticsController = require('./inputs_thermoplastics_controller');

router.get('/', InputsThermoplasticsController.getAll);
router.get('/:id', InputsThermoplasticsController.getOne);
router.post('/', InputsThermoplasticsController.create);
router.put('/:id', InputsThermoplasticsController.update);
router.delete('/:id', InputsThermoplasticsController.remove);

module.exports = router;