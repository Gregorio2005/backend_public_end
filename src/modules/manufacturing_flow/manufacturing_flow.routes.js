const express = require('express');
const router = express.Router();
const ManufacturingFlowController = require('./manufacturing_flow.controller');

router.get('/current-month', ManufacturingFlowController.getCurrentMonth);

module.exports = router;
