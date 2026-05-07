const { Pool } = require('pg');
require('dotenv').config();

// ============================================================================
// CONFIGURACIÓN DE CONEXIÓN
// ============================================================================

// --- OPCIÓN 1: SERVIDOR LOCAL ---
/*
const dbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'sealing_products_sa',
    password: process.env.DB_PASSWORD || 'Oficial1.com',
    port: process.env.DB_PORT || 5432,
};*/

// --- OPCIÓN 2: SERVIDOR EN LA NUBE (NEON) ---

const dbConfig = {
    connectionString: 'postgresql://neondb_owner:npg_otaHCG8I2WPT@ep-calm-voice-ap4zb4d3-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
};

const pool = new Pool(dbConfig);

module.exports = pool;