const express = require('express');
const router = express.Router();
const InputsBagsController = require('./inputs_bags_controller');

router.get('/', InputsBagsController.getAll);
router.get('/:id', InputsBagsController.getOne);
router.post('/', InputsBagsController.create);
router.put('/:id', InputsBagsController.update);
router.delete('/:id', InputsBagsController.remove);

module.exports = router;