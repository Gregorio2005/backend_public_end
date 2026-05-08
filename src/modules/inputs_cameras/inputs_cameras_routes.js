const express = require('express');
const router = express.Router();
const InputsCamerasController = require('./inputs_cameras_controller');
const { validateRequest } = require('../../middleware/validator');
const { inputsCamerasSchema } = require('./inputs_cameras_schema');

router.get('/', InputsCamerasController.getAll);
router.get('/:id', InputsCamerasController.getOne);
router.post('/', validateRequest(inputsCamerasSchema), InputsCamerasController.create);
router.put('/:id', validateRequest(inputsCamerasSchema), InputsCamerasController.update);
router.delete('/:id', InputsCamerasController.remove);

module.exports = router;