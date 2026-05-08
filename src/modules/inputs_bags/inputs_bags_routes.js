const express = require('express');
const router = express.Router();
const InputsBagsController = require('./inputs_bags_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsBagsSchema } = require('./inputs_bags_schema');

router.get('/', InputsBagsController.getAll);
router.get('/:id', InputsBagsController.getOne);
router.post('/', validateRequest(inputsBagsSchema), InputsBagsController.create);
router.put('/:id', validateRequest(inputsBagsSchema), InputsBagsController.update);
router.delete('/:id', InputsBagsController.remove);

module.exports = router;