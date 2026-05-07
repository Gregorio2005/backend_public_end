const express = require('express');
const router = express.Router();
const InputsCardboardController = require('./inputs_cardboard_controller');

router.get('/', InputsCardboardController.getAll);
router.get('/:id', InputsCardboardController.getOne);
router.post('/', InputsCardboardController.create);
router.put('/:id', InputsCardboardController.update);
router.delete('/:id', InputsCardboardController.remove);

module.exports = router;