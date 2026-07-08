const ReportPdfModel = require('./report_pdf.model');

const ReportPdfService = {
    getReportData: async (billDataId) => {
        const billData = await ReportPdfModel.getBillData(billDataId);
        if (!billData) throw new Error('Factura no encontrada');

        const billInputs = await ReportPdfModel.getBillInputs(billDataId);
        const reportsApproved = await ReportPdfModel.getReportsApproved(billDataId);
        const reportsRefused = await ReportPdfModel.getReportsRefused(billDataId);

        return {
            billData,
            billInputs,
            reportsApproved,
            reportsRefused,
            summary: {
                totalApproved: reportsApproved.reduce((sum, r) => sum + Number(r.approved_quantity), 0),
                totalRefused: reportsRefused.reduce((sum, r) => sum + Number(r.claim_quantity), 0),
                approvedRecords: reportsApproved.length,
                refusedRecords: reportsRefused.length
            }
        };
    }
};

module.exports = ReportPdfService;
