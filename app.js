const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { API_PREFIX } = require('./src/config/envs');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();

// Configuración de CORS para habilitar la conexión con el frontend y website
const corsOptions = {
    origin: [
        process.env.FRONTEND_URL,
        process.env.WEBSITE_URL
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Aplicación de middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

const authRouter = require('./src/auth/auth.routes');
const rolesRoutes = require('./src/modules/roles/roles.routes');
const usersRoutes = require('./src/modules/users/users.routes');
const typeInputsRoutes = require('./src/modules/type_inputs/type_inputs.routes');
const suppliersRoutes = require('./src/modules/suppliers/suppliers.routes');
const masterInputsRoutes = require('./src/modules/master_inputs/master_inputs.routes');
const billDataRoutes = require('./src/modules/bill_data/bill_data.routes');
const billInputsRoutes = require('./src/modules/bill_inputs/bill_inputs.routes');
const inputsBagsRoutes = require('./src/modules/inputs_bags/inputs_bags.routes');
const inputsCamerasRoutes = require('./src/modules/inputs_cameras/inputs_cameras.routes');
const inputsCardboardRoutes = require('./src/modules/inputs_cardboard/inputs_cardboard.routes');
const inputsCasesRoutes = require('./src/modules/inputs_cases/inputs_cases.routes');
const inputsChemicalsRoutes = require('./src/modules/inputs_chemicals/inputs_chemicals.routes');
const inputsCollarsRoutes = require('./src/modules/inputs_collars/inputs_collars.routes');
const inputsOringRoutes = require('./src/modules/inputs_oring/inputs_oring.routes');
const inputsStampsRoutes = require('./src/modules/inputs_stamps/inputs_stamps.routes');
const inputsStuffingRoutes = require('./src/modules/inputs_stuffing_stamps_downspouts/inputs_stuffing_stamps_downspouts.routes');
const inputsThermoplasticsRoutes = require('./src/modules/inputs_thermoplastics/inputs_thermoplastics.routes');
const inspectionBagsRoutes = require('./src/modules/inspection_bags/inspection_bags.routes');
const inspectionCamerasRoutes = require('./src/modules/inspection_cameras/inspection_cameras.routes');
const inspectionCardboardRoutes = require('./src/modules/inspection_cardboard/inspection_cardboard.routes');
const inspectionCasesRoutes = require('./src/modules/inspection_cases/inspection_cases.routes');
const inspectionChemicalsRoutes = require('./src/modules/inspection_chemicals/inspection_chemicals.routes');
const inspectionCollarsRoutes = require('./src/modules/inspection_collars/inspection_collars.routes');
const inspectionOringRoutes = require('./src/modules/inspection_oring/inspection_oring.routes');
const inspectionStampsRoutes = require('./src/modules/inspection_stamps/inspection_stamps.routes');
const inspectionStuffingRoutes = require('./src/modules/inspection_stuffing_stamps_downspouts/inspection_stuffing_stamps_downspouts.routes');
const inspectionThermoplasticsRoutes = require('./src/modules/inspection_thermoplastics/inspection_thermoplastics.routes');
const applicantsRoutes = require('./src/auth/applicants.routes');
const reportsApprovedRoutes = require('./src/modules/reports_approved/reports_approved.routes');
const reportsRefusedRoutes = require('./src/modules/reports_refused/reports_refused.routes');
const reportPdfRoutes = require('./src/modules/report_pdf/report_pdf.routes');
const websiteNoticeRoutes = require('./src/auth/website_notice.routes'); // Nueva importación
const inspectionStatsRoutes = require('./src/modules/inspection_stats/inspection_stats.routes');
const manufacturingFlowRoutes = require('./src/modules/manufacturing_flow/manufacturing_flow.routes');
const notificacionesRoutes = require('./src/modules/notifications/notifications.routes');
const profilePhotoRoutes = require('./src/modules/profile_photo/profile_photo.routes');
const websiteProductsRoutes = require('./src/modules/website_products/website_products.routes');

// Rutas Base
app.get('/', (req, res) => {
    res.json({ message: "API de Gestión de Insumos e Inspecciones funcionando" });
});

// Montaje de rutas: API_PREFIX (/api) + /auth
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/roles`, rolesRoutes);
app.use(`${API_PREFIX}/users`, usersRoutes);
app.use(`${API_PREFIX}/type-inputs`, typeInputsRoutes);
app.use(`${API_PREFIX}/suppliers`, suppliersRoutes);
app.use(`${API_PREFIX}/master-inputs`, masterInputsRoutes);
app.use(`${API_PREFIX}/bill-data`, billDataRoutes);
app.use(`${API_PREFIX}/bill-inputs`, billInputsRoutes);
app.use(`${API_PREFIX}/inputs-bags`, inputsBagsRoutes);
app.use(`${API_PREFIX}/inputs-cameras`, inputsCamerasRoutes);
app.use(`${API_PREFIX}/inputs-cardboard`, inputsCardboardRoutes);
app.use(`${API_PREFIX}/inputs-cases`, inputsCasesRoutes);
app.use(`${API_PREFIX}/inputs-chemicals`, inputsChemicalsRoutes);
app.use(`${API_PREFIX}/inputs-collars`, inputsCollarsRoutes);
app.use(`${API_PREFIX}/inputs-oring`, inputsOringRoutes);
app.use(`${API_PREFIX}/inputs-stamps`, inputsStampsRoutes);
app.use(`${API_PREFIX}/inputs-stuffing`, inputsStuffingRoutes);
app.use(`${API_PREFIX}/inputs-thermoplastics`, inputsThermoplasticsRoutes);
app.use(`${API_PREFIX}/inspection-bags`, inspectionBagsRoutes);
app.use(`${API_PREFIX}/inspection-cameras`, inspectionCamerasRoutes);
app.use(`${API_PREFIX}/inspection-cardboard`, inspectionCardboardRoutes);
app.use(`${API_PREFIX}/inspection-cases`, inspectionCasesRoutes);
app.use(`${API_PREFIX}/inspection-chemicals`, inspectionChemicalsRoutes);
app.use(`${API_PREFIX}/inspection-collars`, inspectionCollarsRoutes);
app.use(`${API_PREFIX}/inspection-oring`, inspectionOringRoutes);
app.use(`${API_PREFIX}/inspection-stamps`, inspectionStampsRoutes);
app.use(`${API_PREFIX}/inspection-stuffing`, inspectionStuffingRoutes);
app.use(`${API_PREFIX}/inspection-thermoplastics`, inspectionThermoplasticsRoutes);
app.use(`${API_PREFIX}/applicants`, applicantsRoutes);
app.use(`${API_PREFIX}/reports-approved`, reportsApprovedRoutes);
app.use(`${API_PREFIX}/reports-refused`, reportsRefusedRoutes);
app.use(`${API_PREFIX}/report-pdf`, reportPdfRoutes);
app.use(`${API_PREFIX}/website-notice`, websiteNoticeRoutes); // Montaje de la nueva ruta
app.use(`${API_PREFIX}/inspection-stats`, inspectionStatsRoutes);
app.use(`${API_PREFIX}/manufacturing-flow`, manufacturingFlowRoutes);
app.use(`${API_PREFIX}/notificaciones`, notificacionesRoutes);
app.use(`${API_PREFIX}/profile-photo`, profilePhotoRoutes);
app.use(`${API_PREFIX}/website-products`, websiteProductsRoutes);

// Manejo de errores (Debe ir después de las rutas)
app.use(errorHandler);

// Exportar aplicación
module.exports = app;