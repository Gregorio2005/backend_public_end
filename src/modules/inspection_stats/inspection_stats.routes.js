const express = require('express');
const router = express.Router();
const InspectionStatsController = require('./inspection_stats.controller');

router.get('/status-counts', InspectionStatsController.getStatusCounts);
router.get('/quality-stats', InspectionStatsController.getQualityStats);

module.exports = router;
