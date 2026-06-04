# Sistema de Gestión de Insumos e Inspecciones

API robusta para el control de calidad, facturación y gestión de materiales técnicos, construida con Node.js, Express y PostgreSQL.

## 🚀 Inicio Rápido

1. **Requisitos**: Node.js v18+ y PostgreSQL.
2. **Instalación**: `npm install`
3. **Variables de Entorno**: Configura tu archivo `.env` basado en la lógica de `src/config/envs.js`.
4. **Ejecución**: `npm run dev`

## 📚 Documentación Detallada

Para entender a fondo el sistema, consulta los siguientes documentos en la carpeta `/docs`:

*   **Guía de Instalación**: Requisitos, comandos y extensiones recomendadas.
*   **Estructura del Proyecto**: Explicación de la arquitectura de capas y carpetas.
*   **Base de Datos**: Diccionario de datos, tablas y tipos personalizados.

## 🛠 Arquitectura

El proyecto sigue un patrón modular:
- **Validación**: Mediante Zod.
- **Persistencia**: SQL Puro con `pg` pool.
- **Seguridad**: JWT para sesiones y Bcryptjs para contraseñas.

## 🏗 Módulos Principales

El sistema gestiona más de 29 entidades, incluyendo:
- Inspecciones (Cámaras, Bolsas, Químicos, etc.)
- Facturación y Proveedores.
- Gestión de Usuarios y Roles.

---
Desarrollado para la cátedra de Lenguaje de Programación III.