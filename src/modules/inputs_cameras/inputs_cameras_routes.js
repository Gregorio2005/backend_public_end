const express = require('express');
const router = express.Router();
const InputsCamerasController = require('./inputs_cameras_controller');

router.get('/', InputsCamerasController.getAll);
router.get('/:id', InputsCamerasController.getOne);
router.post('/', InputsCamerasController.create);
router.put('/:id', InputsCamerasController.update);
router.delete('/:id', InputsCamerasController.remove);

module.exports = router;