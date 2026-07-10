const ReportPdfService = require('./report_pdf.service');
const puppeteer = require('puppeteer');

const ReportPdfController = {
    generatePdf: async (req, res, next) => {
        try {
            const { bill_data_id } = req.params;
            const data = await ReportPdfService.getReportData(parseInt(bill_data_id, 10));

            const html = buildReportHtml(data);

            let browser;
            try {
                const isRender = process.env.RENDER === 'true';
                browser = await puppeteer.launch({
                    headless: 'new',
                    ...(isRender && {
                        executablePath: '/usr/bin/chromium-browser',
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-gpu'
                        ]
                    })
                });
                const page = await browser.newPage();
                await page.setContent(html, { waitUntil: 'networkidle0' });
                await page.waitForSelector('.report-container', { timeout: 10000 });

                const pdfBuffer = await page.pdf({
                    format: 'A4',
                    printBackground: true,
                    margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' }
                });

                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="reporte-factura-${bill_data_id}.pdf"`);
                res.end(pdfBuffer);
            } catch (pdfError) {
                console.error("Error generando PDF con Puppeteer:", pdfError);
                throw new Error('No se pudo generar el PDF. Verifique que Puppeteer esté correctamente instalado.');
            } finally {
                if (browser) await browser.close();
            }
        } catch (error) {
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
                <td>${i + 1}</td>
                <td>${input.type_name || 'N/A'}</td>
                <td>${input.reference || 'N/A'}</td>
                <td>${input.oem_number || 'N/A'}</td>
                <td style="text-align:right">${Number(input.quantity || 0).toFixed(2)}</td>
                <td style="text-align:right">${Number(input.quantity_inspection || 0)}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="6" style="text-align:center;color:#999;">No hay insumos registrados</td></tr>';

    const approvedRows = reportsApproved.length > 0
        ? reportsApproved.map((r, i) => `
            <tr>
                <td>${i + 1}</td>
                <td style="text-align:right">${Number(r.approved_quantity).toFixed(4)}</td>
                <td>${r.generated_at ? new Date(r.generated_at).toLocaleDateString('es-VE') : 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="3" style="text-align:center;color:#999;">No hay reportes de aprobaci&oacute;n</td></tr>';

    const refusedRows = reportsRefused.length > 0
        ? reportsRefused.map((r, i) => `
            <tr>
                <td>${i + 1}</td>
                <td style="text-align:right">${Number(r.claim_quantity).toFixed(4)}</td>
                <td>${r.claim_date ? new Date(r.claim_date).toLocaleDateString('es-VE') : 'N/A'}</td>
                <td>${r.rejection_reason || 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="4" style="text-align:center;color:#999;">No hay reportes de rechazo</td></tr>';

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
    <title>Reporte de Inspecci&oacute;n - Factura ${billData.bill_nro || billData.id}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; font-size: 11px; }
        .report-container { padding: 20px; }
        
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 3px solid #a8000c; padding-bottom: 16px; }
        .header-left h1 { font-size: 20px; color: #a8000c; margin-bottom: 4px; }
        .header-left p { font-size: 11px; color: #666; }
        .header-right { text-align: right; font-size: 10px; color: #666; }
        
        .section { margin-bottom: 20px; }
        .section-title { font-size: 13px; font-weight: 700; color: #a8000c; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #e0e0e0; }
        
        .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 20px; margin-bottom: 16px; }
        .info-item label { display: block; font-size: 9px; color: #888; text-transform: uppercase; letter-spacing: 0.3px; }
        .info-item span { font-size: 11px; font-weight: 600; color: #1a1a2e; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
        th { background-color: #f5f5f5; padding: 8px 10px; text-align: left; font-size: 9px; text-transform: uppercase; color: #666; letter-spacing: 0.3px; border-bottom: 2px solid #ddd; }
        td { padding: 7px 10px; border-bottom: 1px solid #eee; font-size: 10px; }
        
        .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .summary-card { padding: 14px; border-radius: 6px; border: 1px solid #e0e0e0; }
        .summary-card.approved { background-color: #f0fdf4; border-left: 4px solid #10b981; }
        .summary-card.refused { background-color: #fef2f2; border-left: 4px solid #ef4444; }
        .summary-card h4 { font-size: 11px; color: #666; margin-bottom: 4px; }
        .summary-card .value { font-size: 22px; font-weight: 700; }
        .summary-card.approved .value { color: #10b981; }
        .summary-card.refused .value { color: #ef4444; }
        
        .bar-chart { margin: 12px 0; }
        .bar-container { display: flex; height: 20px; border-radius: 4px; overflow: hidden; background: #f0f0f0; }
        .bar-approved { background: #10b981; transition: width 0.3s; }
        .bar-refused { background: #ef4444; transition: width 0.3s; }
        .bar-legend { display: flex; gap: 16px; margin-top: 6px; font-size: 10px; color: #666; }
        .bar-legend span::before { content: ''; display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
        .bar-legend .approved::before { background: #10b981; }
        .bar-legend .refused::before { background: #ef4444; }
        
        .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 9px; color: #999; }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="header">
            <div class="header-left">
                <h1>Reporte de Inspecci&oacute;n</h1>
                <p>Factura: <strong>${billData.bill_nro || 'Sin n&uacute;mero'}</strong></p>
            </div>
            <div class="header-right">
                <p>Fecha de generaci&oacute;n: ${today}</p>
                <p>ID: #${billData.id}</p>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Datos de la Factura</div>
            <div class="info-grid">
                <div class="info-item"><label>N&uacute;mero de Factura</label><span>${billData.bill_nro || 'N/A'}</span></div>
                <div class="info-item"><label>C&oacute;digo Odoo</label><span>${billData.odoo || 'N/A'}</span></div>
                <div class="info-item"><label>Fecha de Facturaci&oacute;n</label><span>${billData.billing_date ? new Date(billData.billing_date).toLocaleDateString('es-VE') : 'N/A'}</span></div>
                <div class="info-item"><label>N&uacute;mero de Expediente</label><span>${billData.nro_exp || 'N/A'}</span></div>
                <div class="info-item"><label>N&uacute;mero de Recepci&oacute;n</label><span>${billData.nro_reception || 'N/A'}</span></div>
                <div class="info-item"><label>Fecha de Recepci&oacute;n</label><span>${billData.receipt_date ? new Date(billData.receipt_date).toLocaleDateString('es-VE') : 'N/A'}</span></div>
                <div class="info-item"><label>Proveedor</label><span>${billData.supplier_name || 'N/A'}</span></div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Insumos Asociados</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Referencia</th>
                        <th>OEM</th>
                        <th style="text-align:right">Cantidad</th>
                        <th style="text-align:right">Cant. Inspeccionar</th>
                    </tr>
                </thead>
                <tbody>${billInputsRows}</tbody>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Resumen de Calidad</div>
            <div class="summary-cards">
                <div class="summary-card approved">
                    <h4>Aprobados</h4>
                    <div class="value">${summary.totalApproved}</div>
                    <span style="font-size:10px;color:#666;">${summary.approvedRecords} registro(s)</span>
                </div>
                <div class="summary-card refused">
                    <h4>Rechazados</h4>
                    <div class="value">${summary.totalRefused}</div>
                    <span style="font-size:10px;color:#666;">${summary.refusedRecords} registro(s)</span>
                </div>
            </div>
            <div class="bar-chart">
                <div class="bar-container">
                    <div class="bar-approved" style="width:${approvedWidth}%"></div>
                    <div class="bar-refused" style="width:${refusedWidth}%"></div>
                </div>
                <div class="bar-legend">
                    <span class="approved">Aprobado (${approvedWidth}%)</span>
                    <span class="refused">Rechazado (${refusedWidth}%)</span>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Reporte de Aprobaci&oacute;n</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style="text-align:right">Cantidad Aprobada</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>${approvedRows}</tbody>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Reporte de Rechazo</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style="text-align:right">Cantidad Rechazada</th>
                        <th>Fecha del Reclamo</th>
                        <th>Motivo</th>
                    </tr>
                </thead>
                <tbody>${refusedRows}</tbody>
            </table>
        </div>

        <div class="footer">
            <p>Sealing Products C.A. &mdash; Sistema de Gesti&oacute;n de Insumos e Inspecciones</p>
            <p>Documento generado autom&aacute;ticamente el ${today}</p>
        </div>
    </div>
</body>
</html>`;
}

module.exports = ReportPdfController;
