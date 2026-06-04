const express = require('express');
const router = express.Router();
const RolesController = require('./roles.controller'); // Corregido: usando punto en lugar de guion bajo
const { validateRequest } = require('../../middleware/validator');
const { rolesSchema } = require('./roles.schema');

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getOne);
router.post('/', validateRequest(rolesSchema), RolesController.create);
router.put('/:id', validateRequest(rolesSchema), RolesController.update);
router.delete('/:id', RolesController.remove);

module.exports = router;