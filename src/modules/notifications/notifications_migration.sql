-- =============================================
-- Migración: Tabla de Notificaciones
-- =============================================

-- Enum para estado de notificación
CREATE TYPE status_notificaciones AS ENUM ('No visto', 'Visto');

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status status_notificaciones NOT NULL DEFAULT 'No visto',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_notificaciones_user_id ON notificaciones(user_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_status ON notificaciones(status);
CREATE INDEX IF NOT EXISTS idx_notificaciones_created_at ON notificaciones(created_at DESC);
