const express = require('express');
const router = express.Router();
const RolesController = require('./roles_controller');
const { validateRequest } = require('../../middleware/validator');
const { roleSchema } = require('./roles_schema');

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getOne);
router.post('/', validateRequest(roleSchema), RolesController.create);
router.put('/:id', validateRequest(roleSchema), RolesController.update);
router.delete('/:id', RolesController.remove);

module.exports = router;