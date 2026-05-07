const express = require('express');
const router = express.Router();
const UsersController = require('./users_controller');

// Definición de endpoints para /api/users
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getOne);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);

module.exports = router;