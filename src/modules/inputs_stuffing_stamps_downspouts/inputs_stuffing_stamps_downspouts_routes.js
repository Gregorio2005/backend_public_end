const express = require('express');
const router = express.Router();
const InputsStuffingController = require('./inputs_stuffing_stamps_downspouts_controller');

router.get('/', InputsStuffingController.getAll);
router.get('/:id', InputsStuffingController.getOne);
router.post('/', InputsStuffingController.create);
router.put('/:id', InputsStuffingController.update);
router.delete('/:id', InputsStuffingController.remove);

module.exports = router;