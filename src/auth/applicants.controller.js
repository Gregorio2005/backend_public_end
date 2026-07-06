const ApplicantsModel = require('./applicants.model');
const cloudinary = require('../config/cloudinary');
const {
    sendApplicationConfirmation,
    sendFormalInterviewDate,
    sendFormalInterviewRejection,
    sendFormalInterviewApproval,
    sendMedicalInterviewRejection,
    sendMedicalInterviewApproval,
    sendDiscardNotification,
    sendHireNotification
} = require('../utils/mailer');
const { notifyRole } = require('../utils/notifications');

/**
 * Deriva el status automáticamente a partir de los resultados de entrevista.
 * El status NO se envía desde el frontend; se calcula server-side.
 */
const deriveStatus = (currentStatus, formalDate, formalResult, medicalDate, medicalResult) => {
    if (currentStatus === 'Descartado' || currentStatus === 'Contratado' || currentStatus === 'Rechazado') {
        return currentStatus;
    }

    const formal = (formalResult || '').toLowerCase();
    const medical = (medicalResult || '').toLowerCase();

    if (formal.includes('rechazada') || medical.includes('rechazada')) {
        return 'Rechazado';
    }

    if (formal.includes('aprobada') && medical.includes('aprobada')) {
        return 'Aprobado';
    }

    if (formalDate || medicalDate || formal.includes('aprobada') || medical.includes('aprobada')) {
        return 'Pendiente';
    }

    return currentStatus || 'En revision';
};

/**
 * Helper para enviar correos de forma silenciosa (no bloquea la respuesta HTTP).
 */
const fireEmail = (emailFn, ...args) => {
    emailFn(...args).catch(err => {
        console.error("⚠️ Error al enviar correo (no bloquea la respuesta):", err.message);
    });
};

const ApplicantsController = {
    /**
     * Obtiene y devuelve la lista de todos los postulantes.
     */
    getAllApplicants: async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const result = await ApplicantsModel.findAll({ page, limit });
            res.status(200).json({
                success: true,
                ...result,
                message: 'Lista de postulantes obtenida con éxito.'
            });
        } catch (error) {
            console.error("Error en ApplicantsController.getAllApplicants:", error);
            next(error);
        }
    },

    /**
     * Obtiene un postulante por ID.
     */
    getApplicantById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const applicant = await ApplicantsModel.findById(id);
            if (!applicant) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }
            res.status(200).json({ success: true, data: applicant });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Crea una nueva postulación desde el sitio web.
     * Envía correo de confirmación al postulante.
     */
    createApplicant: async (req, res, next) => {
        try {
            const { name, lastname, ci, email, phone, birth_date, rol } = req.body;

            let cv_url = null;
            if (req.file) {
                const ciClean = (ci || 'unknown').replace(/[^a-zA-Z0-9]/g, '');
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'cvs',
                            resource_type: 'raw',
                            public_id: `${Date.now()}_${ciClean}`
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(req.file.buffer);
                });
                cv_url = result.secure_url;
            }

            const newApplicant = await ApplicantsModel.create({
                name, lastname, ci, email, phone, birth_date, rol, cv_url
            });

            // Enviar correo de confirmación de postulación
            fireEmail(sendApplicationConfirmation, email, name, rol);

            // Notificar a todos los administradores (rol 1)
            notifyRole(1, `Nuevo postulante: ${name} ${lastname} se postuló para ${rol || 'sin especificar'}`);

            res.status(201).json({
                success: true,
                data: newApplicant,
                message: 'Postulación enviada correctamente.'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Actualiza los campos de entrevista de un postulante (Admin).
     * El status se deriva automáticamente server-side.
     * Envía correos según los cambios realizados.
     */
    updateApplicant: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { interview_formal_date, interview_formal_result,
                    interview_medical_date, interview_medical_result } = req.body;

            const currentApplicant = await ApplicantsModel.findById(id);
            if (!currentApplicant) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }

            const newStatus = deriveStatus(
                currentApplicant.status,
                interview_formal_date !== undefined ? interview_formal_date : currentApplicant.interview_formal_date,
                interview_formal_result !== undefined ? interview_formal_result : currentApplicant.interview_formal_result,
                interview_medical_date !== undefined ? interview_medical_date : currentApplicant.interview_medical_date,
                interview_medical_result !== undefined ? interview_medical_result : currentApplicant.interview_medical_result
            );

            const updated = await ApplicantsModel.updateFull(id, {
                status: newStatus,
                interview_formal_date: interview_formal_date !== undefined ? interview_formal_date : currentApplicant.interview_formal_date,
                interview_formal_result: interview_formal_result !== undefined ? interview_formal_result : currentApplicant.interview_formal_result,
                interview_medical_date: interview_medical_date !== undefined ? interview_medical_date : currentApplicant.interview_medical_date,
                interview_medical_result: interview_medical_result !== undefined ? interview_medical_result : currentApplicant.interview_medical_result
            });

            if (!updated) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }

            // --- Lógica de envío de correos según cambios ---

            const { email, name, rol } = currentApplicant;
            const oldFormalDate = currentApplicant.interview_formal_date;
            const oldFormalResult = currentApplicant.interview_formal_result;
            const oldMedicalResult = currentApplicant.interview_medical_result;
            const newFormalDate = updated.interview_formal_date;
            const newFormalResult = updated.interview_formal_result;
            const newMedicalResult = updated.interview_medical_result;

            // 1. Fecha de entrevista formal asignada (de null a valor)
            if (!oldFormalDate && newFormalDate) {
                fireEmail(sendFormalInterviewDate, email, name, rol, newFormalDate);
            }

            // 2. Resultado de entrevista formal cambiado
            if (oldFormalResult !== newFormalResult) {
                if ((newFormalResult || '').includes('rechazada')) {
                    fireEmail(sendFormalInterviewRejection, email, name, rol);
                } else if ((newFormalResult || '').includes('aprobada')) {
                    const newMedicalDate = updated.interview_medical_date;
                    fireEmail(sendFormalInterviewApproval, email, name, rol, newMedicalDate);
                }
            }

            // 3. Resultado de entrevista médica cambiado
            if (oldMedicalResult !== newMedicalResult) {
                if ((newMedicalResult || '').includes('rechazada')) {
                    fireEmail(sendMedicalInterviewRejection, email, name, rol);
                } else if ((newMedicalResult || '').includes('aprobada')) {
                    fireEmail(sendMedicalInterviewApproval, email, name, rol);
                }
            }

            res.json({
                success: true,
                data: updated,
                message: 'Postulante actualizado correctamente.'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Descarta un postulante (status = 'Descartado').
     * Envía correo de notificación.
     */
    discardApplicant: async (req, res, next) => {
        try {
            const { id } = req.params;
            const applicant = await ApplicantsModel.findById(id);
            if (!applicant) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }

            const discarded = await ApplicantsModel.discard(id);

            // Enviar correo de descarte
            fireEmail(sendDiscardNotification, applicant.email, applicant.name, applicant.rol);

            res.json({ success: true, data: discarded, message: 'Postulante descartado correctamente.' });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Contrata un postulante (status = 'Contratado').
     * Envía correo de felicitación.
     */
    hireApplicant: async (req, res, next) => {
        try {
            const { id } = req.params;
            const applicant = await ApplicantsModel.findById(id);
            if (!applicant) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }

            const hired = await ApplicantsModel.hire(id);

            // Enviar correo de contratación
            fireEmail(sendHireNotification, applicant.email, applicant.name, applicant.rol);

            res.json({ success: true, data: hired, message: 'Postulante contratado correctamente.' });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Sirve el CV de un postulante (PDF).
     */
    getCv: async (req, res, next) => {
        try {
            const { id } = req.params;
            const applicant = await ApplicantsModel.findById(id);

            if (!applicant || !applicant.cv_url) {
                return res.status(404).json({ success: false, message: 'CV no disponible.' });
            }

            const response = await fetch(applicant.cv_url);
            if (!response.ok) {
                return res.status(404).json({ success: false, message: 'Archivo CV no encontrado en Cloudinary.' });
            }

            const buffer = await response.arrayBuffer();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            res.send(Buffer.from(buffer));
        } catch (error) {
            next(error);
        }
    },

    /**
     * Elimina un postulante por ID.
     */
    removeApplicant: async (req, res, next) => {
        try {
            const { id } = req.params;
            const applicant = await ApplicantsModel.findById(id);

            if (applicant && applicant.cv_url) {
                try {
                    const parts = applicant.cv_url.split('/');
                    const folderAndFile = parts.slice(parts.indexOf('cvs')).join('/');
                    const publicId = folderAndFile.replace(/\.[^.]+$/, '');
                    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
                } catch (e) {
                    console.error('Error al eliminar CV de Cloudinary:', e.message);
                }
            }

            const deleted = await ApplicantsModel.remove(id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Postulante no encontrado.' });
            }

            res.json({ success: true, message: 'Postulante eliminado correctamente.' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ApplicantsController;
