const express = require('express');
const router = express.Router();
const InputsStampsController = require('./inputs_stamps_controller');

router.get('/', InputsStampsController.getAll);
router.get('/:id', InputsStampsController.getOne);
router.post('/', InputsStampsController.create);
router.put('/:id', InputsStampsController.update);
router.delete('/:id', InputsStampsController.remove);

module.exports = router;