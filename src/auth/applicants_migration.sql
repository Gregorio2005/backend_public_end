-- ============================================================
-- MIGRACION: Expandir tabla postulantes con columnas nuevas
-- Ejecutar este script en PostgreSQL ANTES de usar el backend
-- ============================================================

-- 1. Agregar columna: telefono
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- 2. Agregar columna: fecha de nacimiento
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS birth_date DATE;

-- 3. Agregar columna: ruta del CV (PDF)
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS cv_path VARCHAR(255);

-- 4. Agregar columna: fecha de entrevista formal
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS interview_formal_date TIMESTAMP;

-- 5. Agregar columna: resultado de entrevista formal
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS interview_formal_result VARCHAR(20);

-- 6. Agregar columna: fecha de entrevista medica
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS interview_medical_date TIMESTAMP;

-- 7. Agregar columna: resultado de entrevista medica
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS interview_medical_result VARCHAR(20);

-- 8. Agregar columna: fecha de creacion de la postulacion
ALTER TABLE public.postulantes
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- 9. Crear tipo ENUM (un solo enum para los 3 campos: status, formal_result, medical_result)
DO $$ BEGIN
    CREATE TYPE applicant_status AS ENUM (
        'Pendiente',
        'En revision',
        'Entrevista formal pendiente',
        'Entrevista formal aprobada',
        'Entrevista formal rechazada',
        'Entrevista medica pendiente',
        'Entrevista medica aprobada',
        'Entrevista medica rechazada',
        'Contratado',
        'Descartado'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 9.1. Agregar valores 'Aprobado' y 'Rechazado' al ENUM si no existen
DO $$ BEGIN
    ALTER TYPE applicant_status ADD VALUE 'Aprobado';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TYPE applicant_status ADD VALUE 'Rechazado';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 10. Convertir la columna status al tipo ENUM
UPDATE public.postulantes SET status = 'Pendiente' WHERE status = 'Inactivo';
UPDATE public.postulantes SET status = 'En revision' WHERE status = 'Activo';

ALTER TABLE public.postulantes
    ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.postulantes
    ALTER COLUMN status TYPE applicant_status USING status::applicant_status;

ALTER TABLE public.postulantes
    ALTER COLUMN status SET DEFAULT 'Pendiente';

-- 11. Aplicar el MISMO enum applicant_status a interview_formal_result
ALTER TABLE public.postulantes
    ALTER COLUMN interview_formal_result TYPE applicant_status
    USING interview_formal_result::applicant_status;

ALTER TABLE public.postulantes
    ALTER COLUMN interview_formal_result SET DEFAULT 'Pendiente';

-- 12. Aplicar el MISMO enum applicant_status a interview_medical_result
ALTER TABLE public.postulantes
    ALTER COLUMN interview_medical_result TYPE applicant_status
    USING interview_medical_result::applicant_status;

ALTER TABLE public.postulantes
    ALTER COLUMN interview_medical_result SET DEFAULT 'Pendiente';

-- 13. Renombrar cv_path a cv_url (almacena URL de Cloudinary en vez de filename local)
ALTER TABLE public.postulantes RENAME COLUMN cv_path TO cv_url;
