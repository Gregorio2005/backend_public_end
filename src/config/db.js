const { Pool } = require('pg');
const { DB, NEON_DB_URL, NODE_ENV, DB_MODE } = require('./envs');

// Selector manual basado en DB_MODE (neon o postgresql)
const isNeon = DB_MODE === 'neon';

const dbConfig = isNeon 
    ? { 
        connectionString: NEON_DB_URL, 
        ssl: { 
            rejectUnauthorized: false,
            // Esto silencia la advertencia preparando el código para pg v9
            sslmode: 'verify-full' 
        } 
      }
    : DB;

const pool = new Pool(dbConfig);

pool.on('connect', () => {
    if (NODE_ENV === 'development') {
        const mode = isNeon ? '☁️  NEON (Cloud)' : '💻 LOCAL';
        console.log(`✅ Conectado a PostgreSQL en modo: ${mode}`);
    }
});

pool.on('error', (err) => console.error('❌ Error inesperado en el pool de conexión:', err));

module.exports = pool;