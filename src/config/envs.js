const dotenv = require('dotenv');
dotenv.config();

/**
 * Centralización de variables de entorno con valores por defecto.
 */
module.exports = {
    PORT: process.env.PORT || 3000,
    DB: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432', 10),
    },
    NEON_DB_URL: process.env.NEON_DB_URL, // Nueva variable para la conexión en la nube
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_no_usar_en_produccion',
    NODE_ENV: process.env.NODE_ENV || 'development'
};