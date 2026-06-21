const { z } = require('zod');

// UN SOLO enum para los 3 campos: status, interview_formal_result, interview_medical_result
const applicantStatusEnum = z.enum([
    'Pendiente',
    'En revision',
    'Entrevista formal pendiente',
    'Entrevista formal aprobada',
    'Entrevista formal rechazada',
    'Entrevista medica pendiente',
    'Entrevista medica aprobada',
    'Entrevista medica rechazada',
    'Contratado',
    'Descartado',
    'Aprobado',
    'Rechazado'
]);

/**
 * Esquema de validación para creación de postulantes (desde la website).
 */
const applicantCreateSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "El nombre es obligatorio",
        }).min(1, "El nombre no puede estar vacío").max(100),

        lastname: z.string({
            required_error: "El apellido es obligatorio",
        }).min(1, "El apellido no puede estar vacío").max(100),

        ci: z.string({
            required_error: "La cédula de identidad es obligatoria",
        }).min(1, "La cédula no puede estar vacía").max(20),

        email: z.string({
            required_error: "El correo electrónico es obligatorio",
        }).email("El correo electrónico no es válido").max(150),

        phone: z.string().max(20).optional().nullable(),

        birth_date: z.string().optional().nullable(),

        rol: z.string({
            required_error: "El rol es obligatorio",
        }).min(1, "Debe seleccionar un rol"),
    }),
});

/**
 * Esquema de validación para actualización de postulantes (desde el admin).
 * Los 3 campos usan el MISMO enum applicant_status.
 */
const applicantUpdateSchema = z.object({
    body: z.object({
        status: applicantStatusEnum.optional(),

        interview_formal_date: z.string().optional().nullable(),
        interview_formal_result: applicantStatusEnum.optional().nullable(),

        interview_medical_date: z.string().optional().nullable(),
        interview_medical_result: applicantStatusEnum.optional().nullable(),
    }),
});

module.exports = { applicantCreateSchema, applicantUpdateSchema, applicantStatusEnum };
