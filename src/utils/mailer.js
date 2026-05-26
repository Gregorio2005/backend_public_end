const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, PROJECT_NAME } = require('../config/envs');

/**
 * Configuración del transportador de correo (Transporter).
 * Utiliza las variables validadas en envs.js.
 */
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true para puerto 465, false para otros (como 587)
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

/**
 * Función reutilizable para enviar correos electrónicos.
 * @param {Object} options - Parámetros del correo.
 * @param {string} options.to - Dirección del destinatario.
 * @param {string} options.subject - Asunto del mensaje.
 * @param {string} options.html - Cuerpo del mensaje en formato HTML.
 * @param {Array} [options.attachments] - Archivos adjuntos opcionales.
 */
const sendEmail = async ({ to, subject, html, attachments }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${PROJECT_NAME}" <${SMTP_USER}>`,
            to,
            subject,
            html,
            attachments
        });

        console.log("📧 Correo enviado con ID: %s", info.messageId);
        
        // Debug para verificar destinatario real
        if (process.env.NODE_ENV === 'development') {
            console.log("📬 Destinatario:", to);
            console.log("🔑 Usando cuenta:", SMTP_USER);
        }

        return info;
    } catch (error) {
        console.error("❌ Error en el servicio de correo detalle:", error.message);
        console.error("🔍 Código de error SMTP:", error.code);
        throw new Error(`No se pudo enviar el correo: ${error.message}`);
    }
};

module.exports = { sendEmail };