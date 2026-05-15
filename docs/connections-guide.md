# Guía Rápida de Conexión a Base de Datos

Este documento detalla cómo configurar las dos variantes de conexión permitidas por el sistema, basándose en la validación de `src/config/envs.js`.

## 1. Opción A: PostgreSQL Local

Usa esta opción si tienes PostgreSQL instalado en tu máquina.

### Pasos:
1. Crea la base de datos: `CREATE DATABASE sealing_products_sa;`
2. Ejecuta el script de `docs/database.md`.
3. Configura tu `.env` con los siguientes valores:

```env
PORT=3000
NODE_ENV=development

# Configuración Local
DB_USER=postgres
DB_PASSWORD=Oficial1.com
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=sealing_products_sa

JWT_SECRET=fallback_secret_no_usar_en_produccion
```

## 2. Opción B: Neon DB (Cloud)

Ideal para despliegue rápido o si no quieres gestionar una base de datos local.

### Pasos:
1. Crea un proyecto en Neon.tech.
2. Copia la **Connection String** (debe empezar con `postgresql://...`).
3. En la consola de Neon (SQL Editor), pega y ejecuta el contenido de `docs/database.md`.
4. Configura tu `.env` usando la variable específica que el proyecto reconoce:

```env
PORT=3000
NODE_ENV=development

# Configuración Neon
NEON_DB_URL=postgresql://usuario:password@ep-shard-name.aws.neon.tech/neondb?sslmode=require

JWT_SECRET=tu_secreto_para_tokens
```

## 3. Plantilla Completa (.env)

Puedes copiar este bloque directamente a tu archivo `.env` en la raíz del proyecto y editar los valores:

```text
# Identidad del Proyecto
PROJECT_NAME="Gestión de Insumos API"
API_PREFIX=/api

# Servidor
PORT=3000
NODE_ENV=development
JWT_SECRET=fallback_secret_no_usar_en_produccion

# Base de Datos (Prioriza NEON_DB_URL si el código está configurado para ello, 
# de lo contrario usa los campos individuales)
DB_USER=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=sealing_products_sa
DB_PASSWORD=Oficial1.com

NEON_DB_URL=postgresql://neondb_owner:npg_otaHCG8I2WPT@ep-calm-voice-ap4zb4d3-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require
```

---
**Nota Importante:** El archivo `src/config/envs.js` ya tiene valores por defecto para `DB_USER` (postgres), `DB_HOST` (localhost) y `DB_PORT` (5432). Solo necesitas definir obligatoriamente `DB_DATABASE` y `DB_PASSWORD` para que la conexión funcione.