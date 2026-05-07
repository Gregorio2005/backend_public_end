const express = require('express');
const router = express.Router();
const InputsCollarsController = require('./inputs_collars_controller');

router.get('/', InputsCollarsController.getAll);
router.get('/:id', InputsCollarsController.getOne);
router.post('/', InputsCollarsController.create);
router.put('/:id', InputsCollarsController.update);
router.delete('/:id', InputsCollarsController.remove);

module.exports = router;