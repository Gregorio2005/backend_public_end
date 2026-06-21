-- =============================================
-- Migración: Foto de perfil de usuario
-- =============================================

-- Agregar columnas de foto de perfil a la tabla users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS url_perfil_photo TEXT DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS photo_approved BOOLEAN DEFAULT FALSE;
