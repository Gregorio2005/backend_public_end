const express = require('express');
const router = express.Router();
const UsersController = require('./users.controller');
const { validateRequest } = require('../../middleware/validator');
const { userSchema, updateUserSchema } = require('./users.schema');
const { verifyToken } = require('../../auth/auth');
const { isAdmin } = require('../../middleware/roleAuth');

// Definición de endpoints para /api/users
router.get('/', verifyToken, UsersController.getAll);
router.get('/:id', verifyToken, UsersController.getOne);
router.post('/', verifyToken, validateRequest(userSchema), UsersController.create);
router.put('/:id', verifyToken, isAdmin, validateRequest(updateUserSchema), UsersController.update);
router.delete('/:id', verifyToken, UsersController.remove);

module.exports = router;