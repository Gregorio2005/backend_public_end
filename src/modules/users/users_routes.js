const express = require('express');
const router = express.Router();
const UsersController = require('./users_controller');
const { validateRequest } = require('../../middleware/validator');
const { userSchema, updateUserSchema } = require('./users_schema');

// Definición de endpoints para /api/users
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getOne);
router.post('/', validateRequest(userSchema), UsersController.create);
router.put('/:id', validateRequest(updateUserSchema), UsersController.update);
router.delete('/:id', UsersController.remove);

module.exports = router;