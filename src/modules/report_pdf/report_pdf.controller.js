const ReportPdfService = require('./report_pdf.service');
const { convertHtmlToPdf } = require('html2pdfsmith');

const ReportPdfController = {
    generatePdf: async (req, res, next) => {
        try {
            const { bill_data_id } = req.params;
            const data = await ReportPdfService.getReportData(parseInt(bill_data_id, 10));

            const html = buildReportHtml(data);

            const pdfBuffer = await convertHtmlToPdf({ htmlContent: html, hideHeader: true });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="reporte-factura-${bill_data_id}.pdf"`);
            res.end(pdfBuffer);
        } catch (error) {
            console.error("Error generando PDF:", error);
            next(error);
        }
    }
};

function buildReportHtml(data) {
    const { billData, billInputs, reportsApproved, reportsRefused, summary } = data;
    const today = new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' });

    const billInputsRows = billInputs.length > 0
        ? billInputs.map((input, i) => `
            <tr>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${i + 1}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${input.type_name || 'N/A'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${input.reference || 'N/A'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${input.oem_number || 'N/A'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937; text-align:right;">${Number(input.quantity || 0).toFixed(2)}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937; text-align:right;">${Number(input.quantity_inspection || 0)}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="6" style="padding:12px; text-align:center; color:#9ca3af; font-size:10px;">No hay insumos registrados</td></tr>';

    const approvedRows = reportsApproved.length > 0
        ? reportsApproved.map((r, i) => `
            <tr>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${i + 1}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#166534; font-weight:600; text-align:right;">${Number(r.approved_quantity).toFixed(4)}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${r.generated_at ? new Date(r.generated_at).toLocaleDateString('es-VE') : 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="3" style="padding:12px; text-align:center; color:#9ca3af; font-size:10px;">No hay reportes de aprobaci&oacute;n</td></tr>';

    const refusedRows = reportsRefused.length > 0
        ? reportsRefused.map((r, i) => `
            <tr>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${i + 1}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#991b1b; font-weight:600; text-align:right;">${Number(r.claim_quantity).toFixed(4)}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${r.claim_date ? new Date(r.claim_date).toLocaleDateString('es-VE') : 'N/A'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid #e5e7eb; font-size:10px; color:#1f2937;">${r.rejection_reason || 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="4" style="padding:12px; text-align:center; color:#9ca3af; font-size:10px;">No hay reportes de rechazo</td></tr>';

    const approvedWidth = summary.totalApproved + summary.totalRefused > 0
        ? (summary.totalApproved / (summary.totalApproved + summary.totalRefused) * 100).toFixed(1)
        : 0;
    const refusedWidth = summary.totalApproved + summary.totalRefused > 0
        ? (summary.totalRefused / (summary.totalApproved + summary.totalRefused) * 100).toFixed(1)
        : 0;

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; font-size: 11px; margin: 0; padding: 24px; background: #ffffff;">
    <!-- ENCABEZADO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px; border-bottom:4px solid #9b1c1c;">
        <tr>
            <td style="padding-bottom:20px; width:55%;">
                <h1 style="font-size:22px; color:#9b1c1c; margin:0 0 6px 0; font-weight:700;">Reporte de Inspecci&oacute;n</h1>
                <p style="font-size:12px; color:#6b7280; margin:0;">Factura: <strong style="color:#1f2937;">${billData.bill_nro || 'Sin n&uacute;mero'}</strong></p>
            </td>
            <td style="text-align:right; font-size:10px; color:#6b7280; padding-bottom:20px; width:45%; white-space:nowrap;">
                <p style="margin:0 0 4px 0;">Fecha de generaci&oacute;n: <strong style="color:#1f2937;">${today}</strong></p>
                <p style="margin:0;">ID: <strong style="color:#1f2937;">#${billData.id}</strong></p>
            </td>
        </tr>
    </table>

    <!-- DATOS DE LA FACTURA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
            <td style="padding:10px 14px; background-color:#fff5f5; border-left:4px solid #9b1c1c; font-size:12px; font-weight:700; color:#9b1c1c; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
                Datos de la Factura
            </td>
        </tr>
        <tr>
            <td style="padding:12px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding:6px 0; width:33%; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">N&uacute;mero de Factura</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.bill_nro || 'N/A'}</span>
                        </td>
                        <td style="padding:6px 0; width:33%; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">C&oacute;digo Odoo</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.odoo || 'N/A'}</span>
                        </td>
                        <td style="padding:6px 0; width:33%; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">Fecha de Facturaci&oacute;n</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.billing_date ? new Date(billData.billing_date).toLocaleDateString('es-VE') : 'N/A'}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">N&uacute;mero de Expediente</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.nro_exp || 'N/A'}</span>
                        </td>
                        <td style="padding:6px 0; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">N&uacute;mero de Recepci&oacute;n</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.nro_reception || 'N/A'}</span>
                        </td>
                        <td style="padding:6px 0; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">Fecha de Recepci&oacute;n</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.receipt_date ? new Date(billData.receipt_date).toLocaleDateString('es-VE') : 'N/A'}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding:6px 0; vertical-align:top;">
                            <label style="display:block; font-size:9px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:2px;">Proveedor</label>
                            <span style="font-size:11px; font-weight:600; color:#1f2937;">${billData.supplier_name || 'N/A'}</span>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- INSUMOS ASOCIADOS -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
            <td style="padding:10px 14px; background-color:#fff5f5; border-left:4px solid #9b1c1c; font-size:12px; font-weight:700; color:#9b1c1c; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
                Insumos Asociados
            </td>
        </tr>
        <tr>
            <td style="padding-top:8px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th style="background-color:#fff5f5; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">#</th>
                            <th style="background-color:#fff5f5; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Tipo</th>
                            <th style="background-color:#fff5f5; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Referencia</th>
                            <th style="background-color:#fff5f5; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">OEM</th>
                            <th style="background-color:#fff5f5; padding:10px; text-align:right; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Cantidad</th>
                            <th style="background-color:#fff5f5; padding:10px; text-align:right; font-size:9px; text-transform:uppercase; color:#9b1c1c; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Cant. Inspeccionar</th>
                        </tr>
                    </thead>
                    <tbody>${billInputsRows}</tbody>
                </table>
            </td>
        </tr>
    </table>

    <!-- RESUMEN DE CALIDAD -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
            <td style="padding:10px 14px; background-color:#fff5f5; border-left:4px solid #9b1c1c; font-size:12px; font-weight:700; color:#9b1c1c; text-transform:uppercase; letter-spacing:0.5px;">
                Resumen de Calidad
            </td>
        </tr>
        <tr>
            <td style="padding:16px 8px;">
                <!-- TARJETAS DE RESUMEN -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                    <tr>
                        <td style="padding:20px; background-color:#f0fdf4; border:2px solid #bbf7d0; border-left:6px solid #166534; width:48%; vertical-align:top;">
                            <p style="font-size:10px; color:#166534; text-transform:uppercase; font-weight:700; margin:0 0 8px 0; letter-spacing:0.5px;">Aprobados</p>
                            <p style="font-size:32px; font-weight:700; color:#166534; margin:0; line-height:1;">${summary.totalApproved}</p>
                        </td>
                        <td style="width:4%;"></td>
                        <td style="padding:20px; background-color:#fef2f2; border:2px solid #fecaca; border-left:6px solid #991b1b; width:48%; vertical-align:top;">
                            <p style="font-size:10px; color:#991b1b; text-transform:uppercase; font-weight:700; margin:0 0 8px 0; letter-spacing:0.5px;">Rechazados</p>
                            <p style="font-size:32px; font-weight:700; color:#991b1b; margin:0; line-height:1;">${summary.totalRefused}</p>
                        </td>
                    </tr>
                </table>

                <!-- TABLA COMPARATIVA (reemplaza la grafica de barras) -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:4px;">
                    <tr>
                        <td style="padding:12px 16px; background-color:#f9fafb; border-bottom:1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-size:10px; color:#6b7280;">Porcentaje de Aprobaci&oacute;n</td>
                                    <td style="font-size:14px; font-weight:700; color:#166534; text-align:right;">${approvedWidth}%</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 16px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-size:10px; color:#6b7280;">Porcentaje de Rechazo</td>
                                    <td style="font-size:14px; font-weight:700; color:#991b1b; text-align:right;">${refusedWidth}%</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- REPORTE DE APROBACION -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
            <td style="padding:10px 14px; background-color:#f0fdf4; border-left:4px solid #166534; font-size:12px; font-weight:700; color:#166534; text-transform:uppercase; letter-spacing:0.5px;">
                Reporte de Aprobaci&oacute;n
            </td>
        </tr>
        <tr>
            <td style="padding:8px 14px; background-color:#f0fdf4; border-left:4px solid #166534; font-size:10px; font-weight:700; color:#166534; text-transform:uppercase; letter-spacing:0.3px;">
                Cantidad de Insumos Aprobados
            </td>
        </tr>
        <tr>
            <td style="padding:12px 8px 8px 8px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th style="background-color:#f0fdf4; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#166534; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #bbf7d0;">#</th>
                            <th style="background-color:#f0fdf4; padding:10px; text-align:right; font-size:9px; text-transform:uppercase; color:#166534; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #bbf7d0;">Cantidad Aprobada</th>
                            <th style="background-color:#f0fdf4; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#166534; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #bbf7d0;">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>${approvedRows}</tbody>
                </table>
            </td>
        </tr>
    </table>

    <!-- REPORTE DE RECHAZO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
            <td style="padding:10px 14px; background-color:#fef2f2; border-left:4px solid #991b1b; font-size:12px; font-weight:700; color:#991b1b; text-transform:uppercase; letter-spacing:0.5px;">
                Reporte de Rechazo
            </td>
        </tr>
        <tr>
            <td style="padding:8px 14px; background-color:#fef2f2; border-left:4px solid #991b1b; font-size:10px; font-weight:700; color:#991b1b; text-transform:uppercase; letter-spacing:0.3px;">
                Cantidad de Insumos Rechazados
            </td>
        </tr>
        <tr>
            <td style="padding:12px 8px 8px 8px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th style="background-color:#fef2f2; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#991b1b; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">#</th>
                            <th style="background-color:#fef2f2; padding:10px; text-align:right; font-size:9px; text-transform:uppercase; color:#991b1b; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Cantidad Rechazada</th>
                            <th style="background-color:#fef2f2; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#991b1b; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Fecha del Reclamo</th>
                            <th style="background-color:#fef2f2; padding:10px; text-align:left; font-size:9px; text-transform:uppercase; color:#991b1b; font-weight:700; letter-spacing:0.3px; border-bottom:2px solid #fecaca;">Motivo</th>
                        </tr>
                    </thead>
                    <tbody>${refusedRows}</tbody>
                </table>
            </td>
        </tr>
    </table>

    <!-- PIE DE PAGINA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px; border-top:2px solid #e5e7eb;">
        <tr>
            <td style="padding:16px; text-align:center; background-color:#f9fafb;">
                <p style="font-size:10px; color:#6b7280; margin:0 0 4px 0;">Sealing Products C.A. &mdash; Sistema de Gesti&oacute;n de Insumos e Inspecciones</p>
                <p style="font-size:9px; color:#9ca3af; margin:0;">Documento generado autom&aacute;ticamente el ${today}</p>
            </td>
        </tr>
    </table>

</body>
</html>`;
}

module.exports = ReportPdfController;
