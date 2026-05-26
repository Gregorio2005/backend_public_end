const path = require('path');
const fs = require('fs');
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
            
            if (!email) {
                return res.status(400).json({ success: false, message: 'El correo es requerido.' });
            }

            // 1. Validar si el correo existe en el sistema
            const userCheck = await pool.query(
                'SELECT id, name, "user", email FROM public.users WHERE email = $1',
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

            // Ruta a tu imagen local
            const logoPath = path.join(__dirname, '../assets/logo_empresa.jpeg');
            
            // Verificar si la imagen existe para no romper el envío
            const hasLogo = fs.existsSync(logoPath);

            // 5. Enviar el correo con la contraseña en texto plano
            await sendEmail({
                to: user.email,
                subject: `Recuperación de Contraseña - ${user.name}`,
                html: `
                    <div style="background-color: #dcdcdc; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <!-- Header con Color Corporativo -->
                            <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                                ${hasLogo ? '<img src="cid:logo_empresa" alt="Logo" style="max-height: 80px; width: auto;">' : '<h1 style="color: #ffffff; margin: 0; font-size: 20px;">Sealing Products C.A.</h1>'}
                            </div>
                            
                            <!-- Cuerpo del Mensaje -->
                            <div style="padding: 30px; line-height: 1.6; color: #444;">
                                <h2 style="color: #2c3e50; margin-top: 0;">Hola, ${user.name}</h2>
                                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta de usuario: <strong>${user.user}</strong>.</p>
                                
                                <div style="background-color: #f9f9f9; border-left: 4px solid #2c3e50; padding: 15px; margin: 25px 0; text-align: center;">
                                    <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #777;">Tu nueva contraseña temporal</p>
                                    <p style="margin: 10px 0 0; font-size: 28px; font-weight: bold; color: #2c3e50; letter-spacing: 2px;">${tempPassword}</p>
                                </div>

                                <p>Por favor, utiliza esta clave para iniciar sesión y asegúrate de <strong>cambiarla inmediatamente</strong> desde la configuración de tu perfil por razones de seguridad.</p>
                                
                                <div style="text-align: center; margin-top: 30px;">
                                    <p style="font-size: 13px; color: #888;">Este es un mensaje automático, por favor no respondas a este correo.</p>
                                </div>
                            </div>

                            <!-- Footer -->
                            <div style="background-color: #f1f1f1; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                                <p style="margin: 0; font-size: 12px; color: #999;">
                                    &copy; ${new Date().getFullYear()} Sealing Products C.A. <br>
                                    Departamento de Tecnología y Sistemas.
                                    <span style="display:none !important; font-size:1px; color:#f1f1f1; line-height:1px;">ID: ${Date.now()}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                `,
                attachments: hasLogo ? [
                    {
                        filename: 'logo_empresa.jpeg',
                        path: logoPath,
                        cid: 'logo_empresa' // Este ID debe coincidir con el src="cid:..." del HTML
                    }
                ] : []
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