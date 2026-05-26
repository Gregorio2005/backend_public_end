# Guía de Instalación y Configuración del Entorno

Este documento detalla los pasos necesarios para poner en marcha el entorno de desarrollo y las herramientas recomendadas.

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js**: [Descargar versión LTS](https://nodejs.org/) (incluye npm).
- **PostgreSQL**: [Descargar](https://www.postgresql.org/download/).

## 2. Instalación del Proyecto

Abre una terminal en la raíz del proyecto y ejecuta:

1. **Clonar/Descargar** el proyecto.
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Configurar variables de entorno**:
   - Crea un archivo llamado `.env` en la raíz del proyecto.
   - Copia y ajusta los valores según tu configuración local (ver `src/config/envs.js`).
4. **Inicializar Base de Datos**:
   - Abre tu cliente de PostgreSQL (pgAdmin, psql o DBeaver).
   - Crea una base de datos (ej: `sealing_products_sa`).
   - Ejecuta el script contenido en `docs/database.md` para crear los tipos y tablas.

## 3. Ejecución del Proyecto

```bash
# Modo desarrollo (con autorecarga)
npm run dev
```

## 4. Referencia de Comandos (Instalación Individual)

En caso de que necesites reinstalar o actualizar los componentes principales, estos son los comandos utilizados:

```bash
# Framework y utilidades de servidor
npm install express cors morgan dotenv

# Base de Datos (PostgreSQL)
npm install pg

# Validación de datos (Esquemas)
npm install zod

# Seguridad y Autenticación
npm install bcryptjs jsonwebtoken

# Documentación de API (Swagger)
npm install swagger-ui-express swagger-jsdoc

# Envío de correos
npm install nodemailer

# Herramientas de Desarrollo (Auto-restart)
npm install -D nodemon
```

## 4. Extensiones Recomendadas (VS Code)

Para trabajar de manera profesional con este proyecto en Visual Studio Code, se recomienda instalar:

1.  **ESLint**: Para mantener la calidad del código y detectar errores de sintaxis.
2.  **Prettier - Code formatter**: Para que el código siempre tenga un formato limpio y consistente.
3.  **Dotenv**: Resaltado de sintaxis para archivos `.env`.
4.  **Thunder Client** o **Postman**: Para probar los endpoints de la API directamente.
5.  **Markdown All in One**: Para visualizar y editar estos archivos de documentación cómodamente.
6.  **Zod Snippets**: (Opcional) Ayuda a escribir esquemas de Zod más rápido.
7.  **Auto Close Tag / Auto Rename Tag**: Útiles si trabajas en la parte del frontend con React.
8.  **Bracket Pair Colorizer TDL**: Para no perderte entre tantas llaves en los archivos de rutas y controladores.