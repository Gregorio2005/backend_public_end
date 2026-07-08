const express = require('express');
const router = express.Router();
const ReportPdfController = require('./report_pdf.controller');

router.get('/:bill_data_id', ReportPdfController.generatePdf);

module.exports = router;
