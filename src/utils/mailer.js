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
 */
const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${PROJECT_NAME}" <${SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("📧 Correo enviado con ID: %s", info.messageId);
        
        // Si estamos usando Ethereal, genera una URL para previsualizar el correo en consola
        if (SMTP_HOST.includes('ethereal')) {
            console.log("🔗 Previsualización del correo: %s", nodemailer.getTestMessageUrl(info));
        }

        return info;
    } catch (error) {
        console.error("❌ Error en el servicio de correo:", error);
        throw new Error("No se pudo enviar el correo electrónico.");
    }
};

module.exports = { sendEmail };