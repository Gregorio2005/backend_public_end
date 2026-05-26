# Documentación del Sistema de Autenticación (Registro y Login)

Este documento detalla las modificaciones realizadas para implementar el flujo de autenticación de usuarios, permitiendo la creación de cuentas (Register) y el acceso seguro (Login).

## 1. Resumen de Cambios

Se han implementado nuevos endpoints en el backend y componentes en el frontend para gestionar la identidad del usuario. La seguridad se basa en el hashing de contraseñas y el uso de tokens (JWT o similar según la arquitectura).

## 2. Implementación del Backend

### Endpoints y Contratos de Datos
#### POST `/api/auth/register`
- **Body (JSON)**: `{ "email": "str", "password": "str", "name": "str" }`
- **Respuestas**: 
    - `201 Created`: Usuario registrado con éxito.
    - `400 Bad Request`: Datos inválidos o el correo ya existe.

#### POST `/api/auth/login`
- **Body (JSON)**: `{ "email": "str", "password": "str" }`
- **Respuestas**:
    - `200 OK`: Devuelve `{ "token": "JWT_STRING", "user": { "id": "uuid", "email": "str" } }`.
    - `401 Unauthorized`: Credenciales incorrectas.

#### GET `/api/auth/profile`
- **Seguridad**: Requiere Token Bearer.
- **Descripción**: Retorna la información completa del usuario (User, Name, Lastname, CI, Email, Status) realizando un `JOIN` con la tabla de roles para devolver el nombre del rol en lugar del ID.

#### PUT `/api/auth/profile_update`
- **Seguridad**: Requiere Token Bearer.
- **Body (JSON)**: `{ "user": "opt", "password": "opt", "email": "opt" }`
- **Reglas de Negocio**: 
    - Solo permite modificar el nombre de usuario, la contraseña y el correo.
    - Valida que el nuevo `user` o `email` no pertenezcan a otro usuario registrado.
    - Si se envía `password`, se encripta nuevamente con Bcrypt.

#### POST `/api/auth/forgot_password`
- **Body (JSON)**: `{ "email": "str" }`
- **Descripción**: Flujo de recuperación automática.
    1. Valida la existencia del correo.
    2. Genera una clave temporal aleatoria de 8 caracteres (hex).
    3. Actualiza el hash en la DB.
    4. Envía un correo electrónico corporativo con la nueva clave y el logo de la empresa adjunto.

#### Seguridad y Middleware
- **Hashing**: Se utiliza **bcrypt** para el cifrado de contraseñas con un factor de costo (salt) configurado.
- **Protección de Rutas**: Se implementó el middleware `verifyToken` para interceptar peticiones a rutas protegidas y validar la firma del JWT.

### Seguridad
- Uso mandatorio de **bcrypt** para asegurar que las contraseñas no se guarden en texto plano.
- Implementación de validaciones para asegurar que el correo electrónico sea único y cumpla con el formato correcto.

## 3. Implementación del Frontend

### Componentes Creados/Modificados
- `RegisterForm`: Formulario con validaciones de campos obligatorios y coincidencia de contraseñas.
- `LoginForm`: Gestión de estados de carga y manejo de errores de autenticación.

### Manejo del Estado
- El token recibido tras el login se almacena en `localStorage` o `cookies` de forma segura.
- Se configuró un contexto o hook global para proveer el estado `isAuthenticated` a toda la aplicación.

## 4. Manejo de Expiración (Token Expiry)

Cuando el token alcanza su tiempo de vida (definido por `TOKEN_EXPIRY`):

1. **Backend**: El middleware `verifyToken` devuelve un error `401 Unauthorized`.
2. **Frontend**: 
    - Un interceptor captura el error.
    - Se limpia el `localStorage`.
    - Se redirige al usuario a `/login` con una notificación de sesión expirada.

## 4. Configuración Requerida

Asegúrate de tener las siguientes variables en tu archivo `.env`:

```env
AUTH_SECRET=tu_clave_secreta_aqui
TOKEN_EXPIRY=24h
