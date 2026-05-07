const express = require('express');
const router = express.Router();
const InputsCasesController = require('./inputs_cases_controller');

router.get('/', InputsCasesController.getAll);
router.get('/:id', InputsCasesController.getOne);
router.post('/', InputsCasesController.create);
router.put('/:id', InputsCasesController.update);
router.delete('/:id', InputsCasesController.remove);

module.exports = router;