const express = require('express');
const router = express.Router();
const MasterInputsController = require('./master_inputs.controller');
const { validateRequest } = require('../../middleware/validator');
const { masterInputsSchema } = require('./master_inputs.schema');

router.get('/', MasterInputsController.getAll);
router.get('/:id', MasterInputsController.getOne);
router.post('/', validateRequest(masterInputsSchema), MasterInputsController.create);
router.put('/:id', validateRequest(masterInputsSchema), MasterInputsController.update);
router.delete('/:id', MasterInputsController.remove);

module.exports = router;