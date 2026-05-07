const express = require('express');
const router = express.Router();
const InputsOringController = require('./inputs_oring_controller');

router.get('/', InputsOringController.getAll);
router.get('/:id', InputsOringController.getOne);
router.post('/', InputsOringController.create);
router.put('/:id', InputsOringController.update);
router.delete('/:id', InputsOringController.remove);

module.exports = router;