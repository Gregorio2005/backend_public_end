const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

/**
 * Centralización y validación de variables de entorno mediante Zod.
 * Se incorporan constantes para estandarizar el enrutamiento y la identidad del proyecto.
 */
const envSchema = z.object({
    PORT: z.string().default('3000').transform(Number),
    DB_USER: z.string().default('postgres'),
    DB_HOST: z.string().default('localhost'),
    DB_DATABASE: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_PORT: z.string().default('5432').transform(Number),
    NEON_DB_URL: z.string().optional(),
    JWT_SECRET: z.string().min(10, "El JWT_SECRET debe ser una cadena segura y es obligatorio"),
    TOKEN_EXPIRY: z.string().default('24h'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DB_MODE: z.enum(['postgresql', 'neon']).default('postgresql'),
    // Definición de nombres para el sistema de enrutamiento global
    API_PREFIX: z.string().default('/api'),
    PROJECT_NAME: z.string().default('Gestión de Insumos API'),
    // Configuración de Servidor de Correo (Nodemailer)
    SMTP_HOST: z.string().min(1, "El host SMTP es obligatorio"),
    SMTP_PORT: z.string().default('587').transform(Number),
    SMTP_USER: z.string().min(1, "El usuario SMTP es obligatorio"),
    SMTP_PASS: z.string().min(1, "La contraseña SMTP es obligatoria")
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('❌ Error de configuración (Variables de Entorno):', result.error.format());
    process.exit(1);
}

const env = result.data;

// Debug temporal: Borra esto después de verificar
if (env.NODE_ENV === 'development') {
    console.log('🔍 DEBUG ENV: DB_MODE actual es ->', env.DB_MODE);
}

module.exports = {
    ...env,
    DB: {
        user: env.DB_USER,
        host: env.DB_HOST,
        database: env.DB_DATABASE,
        password: env.DB_PASSWORD,
        port: env.DB_PORT,
    }
};