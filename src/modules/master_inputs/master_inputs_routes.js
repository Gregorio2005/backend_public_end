const express = require('express');
const router = express.Router();
const MasterInputsController = require('./master_inputs_controller');

router.get('/', MasterInputsController.getAll);
router.get('/:id', MasterInputsController.getOne);
router.post('/', MasterInputsController.create);
router.put('/:id', MasterInputsController.update);
router.delete('/:id', MasterInputsController.remove);

module.exports = router;