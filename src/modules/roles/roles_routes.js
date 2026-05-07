const express = require('express');
const router = express.Router();
const RolesController = require('./roles_controller');

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getOne);
router.post('/', RolesController.create);
router.put('/:id', RolesController.update);
router.delete('/:id', RolesController.remove);

module.exports = router;