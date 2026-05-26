const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { createToken } = require('./jwt_utils');
const { sendEmail } = require('../utils/mailer');

const AuthController = {
    /**
     * Registra un nuevo usuario con la contraseña encriptada.
     */
    register: async (req, res, next) => {
        try {
            const { user, password, name, lastname, ci, email, roles_id, status } = req.body;

            // Encriptar contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await pool.query(
                `INSERT INTO public.users 
                ("user", password, name, lastname, ci, email, roles_id, status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, "user"`,
                [user, hashedPassword, name, lastname, ci, email, roles_id || 1, status || 'Activo']
            );

            res.status(201).json({
                success: true,
                message: 'Usuario creado con éxito',
                data: result.rows[0]
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Maneja la petición de login.
     */
    login: async (req, res, next) => {
        try {
            const { user, password } = req.body;

            if (!user || !password) {
                return res.status(400).json({ success: false, message: 'Usuario y contraseña requeridos' });
            }

            // Buscamos al usuario en la tabla public.users
            const result = await pool.query(
                'SELECT * FROM public.users WHERE "user" = $1',
                [user]
            );

            const dbUser = result.rows[0];

            // 1. Verificar si el usuario existe
            if (!dbUser) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            // 2. Verificar si el usuario está activo
            if (dbUser.status !== 'Activo') {
                return res.status(401).json({ success: false, message: 'Usuario inactivo en la nomina' });
            }

            // 3. Validar la contraseña (comparación bcrypt)
            if (!(await bcrypt.compare(password, dbUser.password))) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            // Generamos el token con el ID y el rol definido en el esquema
            const token = createToken({ id: dbUser.id, role: dbUser.roles_id });

            res.json({ 
                success: true, 
                token,
                user: {
                    name: dbUser.name,
                    role: dbUser.roles_id,
                    email: dbUser.email
                }
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Maneja la obtención del perfil actual (/me).
     */
    getMe: async (req, res, next) => {
        try {
            // Obtenemos los datos del usuario actual (el ID viene del middleware de auth)
            const result = await pool.query(
                'SELECT id, "user", name, lastname, email, roles_id, status FROM public.users WHERE id = $1',
                [req.user.id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            res.json({ success: true, data: result.rows[0] });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Maneja la recuperación de contraseña.
     * Genera una nueva clave, la encripta en DB y la envía por correo.
     */
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            // 1. Validar si el correo existe en el sistema
            const userCheck = await pool.query(
                'SELECT id, name, "user" FROM public.users WHERE email = $1',
                [email]
            );

            if (userCheck.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'El correo electrónico no se encuentra registrado en nuestro sistema.'
                });
            }

            const user = userCheck.rows[0];

            // 2. Crear nueva contraseña temporal (8 caracteres aleatorios)
            const tempPassword = crypto.randomBytes(4).toString('hex');

            // 3. Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(tempPassword, salt);

            // 4. Actualizar en la base de datos
            await pool.query(
                'UPDATE public.users SET password = $1 WHERE id = $2',
                [hashedPassword, user.id]
            );

            // 5. Enviar el correo con la contraseña en texto plano
            await sendEmail({
                to: email,
                subject: 'Recuperación de Contraseña - Gestión de Insumos',
                html: `
                    <h1>Hola, ${user.name}</h1>
                    <p>Has solicitado restablecer tu contraseña para el usuario <strong>${user.user}</strong>.</p>
                    <p>Tu nueva contraseña temporal es: <strong>${tempPassword}</strong></p>
                    <p>Por seguridad, te recomendamos cambiarla una vez que hayas iniciado sesión.</p>
                `
            });

            res.json({ 
                success: true, 
                message: `Se ha enviado una nueva contraseña al correo: ${email}`
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AuthController;