const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./src/middleware/errorHandler');
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const rolesRoutes = require('./src/modules/roles/roles_routes');
const usersRoutes = require('./src/modules/users/users_routes');
const typeInputsRoutes = require('./src/modules/type_inputs/type_inputs_routes');
const suppliersRoutes = require('./src/modules/suppliers/suppliers_routes');
const masterInputsRoutes = require('./src/modules/master_inputs/master_inputs_routes');
const billDataRoutes = require('./src/modules/bill_data/bill_data_routes');
const billInputsRoutes = require('./src/modules/bill_inputs/bill_inputs_routes');
const inputsBagsRoutes = require('./src/modules/inputs_bags/inputs_bags_routes');
const inputsCamerasRoutes = require('./src/modules/inputs_cameras/inputs_cameras_routes');
const inputsCardboardRoutes = require('./src/modules/inputs_cardboard/inputs_cardboard_routes');
const inputsCasesRoutes = require('./src/modules/inputs_cases/inputs_cases_routes');
const inputsChemicalsRoutes = require('./src/modules/inputs_chemicals/inputs_chemicals_routes');
const inputsCollarsRoutes = require('./src/modules/inputs_collars/inputs_collars_routes');
const inputsOringRoutes = require('./src/modules/inputs_oring/inputs_oring_routes');
const inputsStampsRoutes = require('./src/modules/inputs_stamps/inputs_stamps_routes');
const inputsStuffingRoutes = require('./src/modules/inputs_stuffing_stamps_downspouts/inputs_stuffing_stamps_downspouts_routes');
const inputsThermoplasticsRoutes = require('./src/modules/inputs_thermoplastics/inputs_thermoplastics_routes');
const inspectionBagsRoutes = require('./src/modules/inspection_bags/inspection_bags_routes');
const inspectionCamerasRoutes = require('./src/modules/inspection_cameras/inspection_cameras_routes');
const inspectionCardboardRoutes = require('./src/modules/inspection_cardboard/inspection_cardboard_routes');
const inspectionCasesRoutes = require('./src/modules/inspection_cases/inspection_cases_routes');
const inspectionChemicalsRoutes = require('./src/modules/inspection_chemicals/inspection_chemicals_routes');
const inspectionCollarsRoutes = require('./src/modules/inspection_collars/inspection_collars_routes');
const inspectionOringRoutes = require('./src/modules/inspection_oring/inspection_oring_routes');
const inspectionStampsRoutes = require('./src/modules/inspection_stamps/inspection_stamps_routes');
const inspectionStuffingRoutes = require('./src/modules/inspection_stuffing_stamps_downspouts/inspection_stuffing_stamps_downspouts_routes');
const inspectionThermoplasticsRoutes = require('./src/modules/inspection_thermoplastics/inspection_thermoplastics_routes');
const reportsApprovedRoutes = require('./src/modules/reports_approved/reports_approved_routes');
const reportsRefusedRoutes = require('./src/modules/reports_refused/reports_refused_routes');

// Rutas Base
app.get('/', (req, res) => {
    res.json({ message: "API de Gestión de Insumos e Inspecciones funcionando" });
});

app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/type-inputs', typeInputsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/master-inputs', masterInputsRoutes);
app.use('/api/bill-data', billDataRoutes);
app.use('/api/bill-inputs', billInputsRoutes);
app.use('/api/inputs-bags', inputsBagsRoutes);
app.use('/api/inputs-cameras', inputsCamerasRoutes);
app.use('/api/inputs-cardboard', inputsCardboardRoutes);
app.use('/api/inputs-cases', inputsCasesRoutes);
app.use('/api/inputs-chemicals', inputsChemicalsRoutes);
app.use('/api/inputs-collars', inputsCollarsRoutes);
app.use('/api/inputs-oring', inputsOringRoutes);
app.use('/api/inputs-stamps', inputsStampsRoutes);
app.use('/api/inputs-stuffing', inputsStuffingRoutes);
app.use('/api/inputs-thermoplastics', inputsThermoplasticsRoutes);
app.use('/api/inspection-bags', inspectionBagsRoutes);
app.use('/api/inspection-cameras', inspectionCamerasRoutes);
app.use('/api/inspection-cardboard', inspectionCardboardRoutes);
app.use('/api/inspection-cases', inspectionCasesRoutes);
app.use('/api/inspection-chemicals', inspectionChemicalsRoutes);
app.use('/api/inspection-collars', inspectionCollarsRoutes);
app.use('/api/inspection-oring', inspectionOringRoutes);
app.use('/api/inspection-stamps', inspectionStampsRoutes);
app.use('/api/inspection-stuffing', inspectionStuffingRoutes);
app.use('/api/inspection-thermoplastics', inspectionThermoplasticsRoutes);
app.use('/api/reports-approved', reportsApprovedRoutes);
app.use('/api/reports-refused', reportsRefusedRoutes);

// Manejo de errores (Debe ir después de las rutas)
app.use(errorHandler);

// Exportar aplicación
module.exports = app;