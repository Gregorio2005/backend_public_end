const emailjs = require('@emailjs/nodejs');
const { 
    EMAILJS_SERVICE_ID, 
    EMAILJS_TEMPLATE_ID, 
    EMAILJS_PUBLIC_KEY, 
    EMAILJS_PRIVATE_KEY, 
    PROJECT_NAME 
} = require('../config/envs');

/**
 * Configuración global de EmailJS para Node.js
 */
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
    privateKey: EMAILJS_PRIVATE_KEY,
});

/**
 * Función reutilizable para enviar correos electrónicos.
 * En EmailJS, los datos se envían como variables para la plantilla definida en el dashboard.
 */
const sendEmail = async ({ to, subject, html, text, fromName, templateParams }) => {
    try {
        // Estos nombres de la izquierda (to_email, subject...) son los que DEBES 
        // usar en el Dashboard de EmailJS entre llaves {{ }}
        const params = {
            to_email: to,
            subject: subject,
            message_html: html,
            message_text: text || "Contenido en texto plano no disponible",
            from_name: fromName || PROJECT_NAME,
            project_name: PROJECT_NAME,
            ...templateParams // Esto permite inyectar {{name}}, {{role}}, etc.
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            params
        );

        console.log("📧 Correo enviado vía EmailJS con éxito:", response.status, response.text);
        
        if (process.env.NODE_ENV === 'development') {
            console.log("📬 Destinatario:", to);
        }

        return response;
    } catch (error) {
        console.error("❌ Error en el servicio de EmailJS:", error);
        const errorMessage = error?.text || error?.message || "Error desconocido en el proveedor de correo";
        throw new Error(`No se pudo enviar el correo: ${errorMessage}`);
    }
};

/**
 * Envía un correo de confirmación a un postulante con fecha de entrevista programada.
 */
const sendApplicantConfirmation = async (email, name, role) => {
    // 1. Calcular el siguiente lunes
    const today = new Date();
    // (1 [Lunes] + 7 - día_actual) % 7. Si da 0, sumamos 7 para que sea el PRÓXIMO lunes.
    const daysUntilNextMonday = (1 + 7 - today.getDay()) % 7 || 7;
    
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);

    // Formatear fecha: "lunes, 12 de junio de 2024"
    const formattedDate = nextMonday.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const htmlContent = `
        <div style="font-family: 'Segoe UI', sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 1.2rem; letter-spacing: 1px;">${PROJECT_NAME}</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
                <h2 style="color: #2c3e50;">¡Hola, ${name}!</h2>
                <p>Tu postulación para la vacante de <strong>${role}</strong> ha sido recibida con éxito en nuestro sistema.</p>
                
                <div style="background-color: #f8fafc; border-left: 4px solid #38bdf8; padding: 20px; margin: 25px 0;">
                    <p style="margin: 0; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.8rem;">Cita de Entrevista Inicial</p>
                    <p style="margin: 10px 0 0 0; font-size: 1.1rem; color: #0f172a;">
                        📅 <strong>${formattedDate}</strong>
                    </p>
                </div>

                <p>Nuestro equipo de Recursos Humanos se pondrá en contacto contigo a través de este medio para indicarte la hora y la modalidad (presencial o virtual).</p>
                
                <p>Agradecemos tu interés en formar parte de <strong>Sealing Products C.A.</strong></p>
                
                <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.85rem; color: #64748b; text-align: center;">
                    <p>Este es un mensaje automático del Sistema SICVIC. Por favor, no respondas a este correo.</p>
                </div>
            </div>
        </div>
    `;

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Confirmación de Postulación y Citación a Entrevista - ${PROJECT_NAME}`,
        html: htmlContent,
        templateParams: {
            name: name,
            role: role,
            formattedDate: formattedDate
        }
    });
};

module.exports = { 
    sendEmail,
    sendApplicantConfirmation
};