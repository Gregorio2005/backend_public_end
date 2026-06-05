const { Resend } = require('resend');
const { RESEND_API_KEY, PROJECT_NAME } = require('../config/envs');

/**
 * Inicialización del cliente de Resend.
 * Esto evita el bloqueo de puertos SMTP en hostings como Railway/Render.
 */
const resend = new Resend(RESEND_API_KEY);

/**
 * Función reutilizable para enviar correos electrónicos.
 */
const sendEmail = async ({ to, subject, html, attachments, fromName }) => {
    try {
        /**
         * Filtramos los adjuntos: Resend requiere que 'path' sea una URL (http/https).
         * Si en el futuro usas URLs públicas, aquí se mapearán automáticamente.
         */
        const mappedAttachments = attachments?.filter(att => att.path && att.path.startsWith('http')).map(att => ({
            filename: att.filename,
            path: att.path,
        })) || [];

        const { data, error } = await resend.emails.send({
            from: `${fromName || PROJECT_NAME} <onboarding@resend.dev>`,
            to,
            subject,
            html,
            attachments: mappedAttachments
        });

        if (error) {
            throw error;
        }

        console.log("📧 Correo enviado con ID:", data.id);
        
        if (process.env.NODE_ENV === 'development') {
            console.log("📬 Enviando vía Resend a:", to);
        }

        return data;
    } catch (error) {
        console.error("❌ Error en el servicio de Resend:", error.message);
        // Si es un error de Resend, a veces viene en la propiedad error.message o el objeto mismo
        const errorMessage = error.message || "Error desconocido en el proveedor de correo";
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
        html: htmlContent
    });
};

module.exports = { 
    sendEmail,
    sendApplicantConfirmation
};