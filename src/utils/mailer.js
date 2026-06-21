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
        const params = {
            to_email: to,
            subject: subject,
            message_html: html,
            message_text: text || "Contenido en texto plano no disponible",
            from_name: fromName || PROJECT_NAME,
            project_name: PROJECT_NAME,
            email: to,
            ...templateParams
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
 * Plantilla HTML base para todos los correos de postulación.
 */
const buildEmailLayout = (title, name, contentBlocks) => {
    const blocksHtml = contentBlocks.map(block => {
        if (block.type === 'highlight') {
            return `
                <div style="background-color: ${block.bgColor || '#f8fafc'}; border-left: 4px solid ${block.borderColor || '#38bdf8'}; padding: 20px; margin: 25px 0;">
                    <p style="margin: 0; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 0.8rem;">${block.label}</p>
                    <p style="margin: 10px 0 0 0; font-size: 1.05rem; color: #0f172a;">${block.value}</p>
                </div>`;
        }
        return `<p style="margin: 15px 0; line-height: 1.6; color: #1e293b;">${block.text}</p>`;
    }).join('');

    return `
        <div style="font-family: 'Segoe UI', sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 1.2rem; letter-spacing: 1px;">${PROJECT_NAME}</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
                <h2 style="color: #2c3e50; margin-top: 0;">${title}</h2>
                <p style="font-size: 1rem;">¡Hola, <strong>${name}</strong>!</p>
                ${blocksHtml}
                <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.85rem; color: #64748b; text-align: center;">
                    <p>Este es un mensaje automático del Sistema SICVIC. Por favor, no respondas a este correo.</p>
                </div>
            </div>
        </div>`;
};

/**
 * 1. Confirmación de postulación enviada desde la website.
 */
const sendApplicationConfirmation = async (email, name, role) => {
    const html = buildEmailLayout('¡Postulación Recibida!', name, [
        { type: 'text', text: `Tu postulación para la vacante de <strong>${role}</strong> ha sido recibida correctamente en nuestro sistema.` },
        { type: 'highlight', label: 'Estado', value: 'Tu postulación está siendo procesada por nuestro equipo de Recursos Humanos.', bgColor: '#eff6ff', borderColor: '#3b82f6' },
        { type: 'text', text: 'Pronto recibirás un correo electrónico indicando la fecha y hora de tu entrevista presencial.' },
        { type: 'text', text: 'Agradecemos tu interés en formar parte de <strong>Sealing Products C.A.</strong>' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Postulación Recibida - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 2. Fecha de entrevista formal asignada.
 */
const sendFormalInterviewDate = async (email, name, role, date) => {
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = new Date(date).toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit'
    });

    const html = buildEmailLayout('Fecha de Entrevista Asignada', name, [
        { type: 'text', text: `Tu postulación para la vacante de <strong>${role}</strong> ha avanzado al siguiente paso.` },
        { type: 'highlight', label: 'Entrevista Formal / Técnica', value: `📅 ${formattedDate}\n🕐 ${formattedTime}`, bgColor: '#f0fdf4', borderColor: '#22c55e' },
        { type: 'text', text: 'Te recomendamos llegar 10 minutos antes de la hora programada. Trae contigo tu cédula de identidad y una copia de tu currículum.' },
        { type: 'text', text: 'Si necesitas reprogramar, comunícate lo antes posible a través de este medio.' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Entrevista Formal Programada - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 3. Entrevista formal rechazada.
 */
const sendFormalInterviewRejection = async (email, name, role) => {
    const html = buildEmailLayout('Resultado de Entrevista Formal', name, [
        { type: 'text', text: `Hemos evaluado tu postulación para la vacante de <strong>${role}</strong> en la entrevista formal / técnica.` },
        { type: 'highlight', label: 'Resultado', value: '❌ Lamentablemente, tu postulación no ha sido aprobada en esta etapa.', bgColor: '#fef2f2', borderColor: '#ef4444' },
        { type: 'text', text: 'Te animamos a que sigas revisando nuestras vacantes en el sitio web y que apliques nuevamente en el futuro.' },
        { type: 'text', text: 'Agradecemos tu interés en formar parte de <strong>Sealing Products C.A.</strong>' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Resultado de Entrevista Formal - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 4. Entrevista formal aprobada (indicando fecha para entrevista médica).
 */
const sendFormalInterviewApproval = async (email, name, role, medicalDate) => {
    const formattedDate = medicalDate
        ? new Date(medicalDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : null;
    const formattedTime = medicalDate
        ? new Date(medicalDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        : null;

    const contentBlocks = [
        { type: 'text', text: `Tu postulación para la vacante de <strong>${role}</strong> ha sido aprobada en la entrevista formal / técnica.` },
    ];

    if (formattedDate) {
        contentBlocks.push(
            { type: 'highlight', label: 'Entrevista Médica Programada', value: `📅 ${formattedDate}\n🕐 ${formattedTime}`, bgColor: '#f0fdf4', borderColor: '#22c55e' },
            { type: 'text', text: 'Te recomendamos llegar 10 minutos antes de la hora programada. Trae contigo tu cédula de identidad.' }
        );
    } else {
        contentBlocks.push(
            { type: 'highlight', label: 'Siguiente Paso', value: '📋 Entrevista Médica - Próximamente recibirás la fecha y hora de tu entrevista médica.', bgColor: '#f0fdf4', borderColor: '#22c55e' }
        );
    }

    contentBlocks.push({ type: 'text', text: '¡Mucho éxito!' });

    const html = buildEmailLayout('¡Felicitaciones! Entrevista Formal Aprobada', name, contentBlocks);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Entrevista Formal Aprobada - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 5. Entrevista médica rechazada.
 */
const sendMedicalInterviewRejection = async (email, name, role) => {
    const html = buildEmailLayout('Resultado de Entrevista Médica', name, [
        { type: 'text', text: `Hemos evaluado tu postulación para la vacante de <strong>${role}</strong> en la entrevista médica.` },
        { type: 'highlight', label: 'Resultado', value: '❌ Lamentablemente, tu postulación no ha sido aprobada en esta etapa.', bgColor: '#fef2f2', borderColor: '#ef4444' },
        { type: 'text', text: 'Te animamos a que sigas revisando nuestras vacantes en el sitio web y que apliques nuevamente en el futuro.' },
        { type: 'text', text: 'Agradecemos tu interés en formar parte de <strong>Sealing Products C.A.</strong>' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Resultado de Entrevista Médica - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 6. Entrevista médica aprobada.
 */
const sendMedicalInterviewApproval = async (email, name, role) => {
    const html = buildEmailLayout('¡Felicitaciones! Proceso Completado', name, [
        { type: 'text', text: `Tu postulación para la vacante de <strong>${role}</strong> ha sido aprobada en la entrevista médica.` },
        { type: 'highlight', label: 'Estado', value: '✅ Has completado exitosamente todas las etapas del proceso de selección.', bgColor: '#f0fdf4', borderColor: '#22c55e' },
        { type: 'text', text: 'Nuestro equipo de Recursos Humanos se pondrá en contacto contigo para los siguientes pasos.' },
        { type: 'text', text: '¡Estamos encantados de que continues en el proceso!' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `¡Postulación Aprobada! - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 7. Postulante descartado.
 */
const sendDiscardNotification = async (email, name, role) => {
    const html = buildEmailLayout('Resultado de Postulación', name, [
        { type: 'text', text: `Hemos revisado tu postulación para la vacante de <strong>${role}</strong>.` },
        { type: 'highlight', label: 'Estado', value: '❌ Tu postulación ha sido descartada en este proceso de selección.', bgColor: '#fef2f2', borderColor: '#ef4444' },
        { type: 'text', text: 'Te animamos a que sigas revisando nuestras vacantes en el sitio web y que apliques nuevamente en el futuro.' },
        { type: 'text', text: 'Agradecemos tu interés en formar parte de <strong>Sealing Products C.A.</strong>' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `Resultado de Postulación - ${PROJECT_NAME}`,
        html
    });
};

/**
 * 8. Postulante contratado.
 */
const sendHireNotification = async (email, name, role) => {
    const html = buildEmailLayout('¡Bienvenido al Equipo!', name, [
        { type: 'text', text: `¡Tenemos excelentes noticias! Tu postulación para la vacante de <strong>${role}</strong> ha sido aprobada.` },
        { type: 'highlight', label: 'Estado', value: '🎉 ¡Has sido contratado para formar parte de Sealing Products C.A.!', bgColor: '#f0fdf4', borderColor: '#22c55e' },
        { type: 'text', text: 'Nuestro equipo de Recursos Humanos se pondrá en contacto contigo pronto para indicarte los detalles de tu ingreso, horario y documentación requerida.' },
        { type: 'text', text: '¡Te damos la bienvenida y esperamos que sea el inicio de una gran trayectoria!' }
    ]);

    return await sendEmail({
        to: email,
        fromName: `Reclutamiento - ${PROJECT_NAME}`,
        subject: `¡Contratación Confirmada! - ${PROJECT_NAME}`,
        html
    });
};

module.exports = { 
    sendEmail,
    sendApplicationConfirmation,
    sendFormalInterviewDate,
    sendFormalInterviewRejection,
    sendFormalInterviewApproval,
    sendMedicalInterviewRejection,
    sendMedicalInterviewApproval,
    sendDiscardNotification,
    sendHireNotification
};
