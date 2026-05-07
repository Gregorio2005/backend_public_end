const express = require('express');
const router = express.Router();
const InputsChemicalsController = require('./inputs_chemicals_controller');

router.get('/', InputsChemicalsController.getAll);
router.get('/:id', InputsChemicalsController.getOne);
router.post('/', InputsChemicalsController.create);
router.put('/:id', InputsChemicalsController.update);
router.delete('/:id', InputsChemicalsController.remove);

module.exports = router;