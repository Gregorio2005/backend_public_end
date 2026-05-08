const express = require('express');
const router = express.Router();
const MasterInputsController = require('./master_inputs_controller');
const { validateRequest } = require('../../middleware/validator');
const { masterInputSchema } = require('./master_inputs_schema');

router.get('/', MasterInputsController.getAll);
router.get('/:id', MasterInputsController.getOne);
router.post('/', validateRequest(masterInputSchema), MasterInputsController.create);
router.put('/:id', validateRequest(masterInputSchema), MasterInputsController.update);
router.delete('/:id', MasterInputsController.remove);

module.exports = router;