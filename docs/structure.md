# Estructura del Proyecto

Este documento describe la organización de carpetas y archivos del sistema, siguiendo un patrón de arquitectura modular y capas de responsabilidad.

## 1. Raíz del Proyecto

- `.env`: Variables de entorno (credenciales de DB, secretos JWT).
- `app.js`: Configuración central de Express, middlewares globales y registro de rutas.
- `server.js`: Punto de entrada que inicia el servidor HTTP.
- `package.json`: Definición de dependencias y scripts de ejecución.
- `docs/`: Documentación técnica del sistema.

## 2. Carpeta de Documentación (`/docs`)

- `database.md`: Definición de tablas, tipos y esquema SQL.
- `setup.md`: Guía de instalación y extensiones recomendadas.
- `structure.md`: (Este archivo) Mapa del código fuente.

## 3. Código Fuente (`/src`)

### `/config`
Contiene la lógica de configuración global.
- `db.js`: Configuración del pool de conexiones a PostgreSQL.
- `envs.js`: Validación y tipado de variables de entorno con Zod.

### `/middleware`
Funciones intermedias que procesan las peticiones antes de llegar a los controladores.
- `auth.js`: Verificación de identidad mediante JSON Web Tokens.
- `errorHandler.js`: Captura centralizada de excepciones y respuestas de error.
- `validator.js`: Middleware para ejecutar validaciones de Zod.

### `/auth`
- `auth.js`: Lógica específica de autenticación, controladores y rutas de acceso.

### `/modules`
Esta es la carpeta más importante. El sistema está dividido en **módulos independientes** por cada entidad de la base de datos (más de 29 tablas). Cada módulo contiene sus propias capas:

#### Estructura Interna de un Módulo (Ejemplo: `users`)
1.  **`*_routes.js`**: Define los endpoints y asocia los middlewares de seguridad y validación.
2.  **`*_schema.js`**: Define la estructura de datos esperada (contratos) usando Zod.
3.  **`*_controller.js`**: Gestiona la entrada/salida HTTP. No contiene lógica de negocio.
4.  **`*_service.js`**: Cerebro del módulo. Aquí reside la lógica de negocio, cálculos y reglas de integridad.
5.  **`*_model.js`**: Capa de persistencia. Contiene las consultas SQL puras.

#### Clasificación de Módulos
- **Administración**: `users/`, `roles/`, `suppliers/`.
- **Gestión de Insumos**: `master_inputs/`, `type_inputs/`, `bill_data/`, `bill_inputs/`.
- **Definiciones Técnicas de Insumos**:
    - `inputs_bags/`
    - `inputs_cameras/`
    - `inputs_cardboard/`
    - `inputs_cases/`
    - `inputs_chemicals/`
    - `inputs_collars/`
    - `inputs_oring/`
    - `inputs_stamps/`
    - `inputs_stuffing_stamps_downspouts/`
    - `inputs_thermoplastics/`
- **Control de Calidad (Inspecciones)**:
    - `inspection_bags/`, `inspection_cameras/`, `inspection_cardboard/`, `inspection_cases/`,
    - `inspection_chemicals/`, `inspection_collars/`, `inspection_oring/`, `inspection_stamps/`,
    - `inspection_stuffing_stamps_downspouts/`, `inspection_thermoplastics/`
- **Reportes**: `reports_approved/`, `reports_refused/`.

## 4. Flujo de una Petición

Para asegurar la mantenibilidad, una petición siempre sigue este camino:

1.  **Cliente** envía petición.
2.  **`app.js`** la recibe y la deriva al **Router** del módulo correspondiente.
3.  El **Middleware** valida el Token y el Esquema (Zod).
4.  El **Controlador** extrae los datos y llama al **Servicio**.
5.  El **Servicio** aplica la lógica y solicita datos al **Modelo**.
6.  El **Modelo** ejecuta el SQL en **PostgreSQL**.
7.  La respuesta regresa por la misma cadena hasta el cliente en formato JSON.