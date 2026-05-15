const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { createToken } = require('./jwt_utils');

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
     * Placeholder para la lógica de recuperación de contraseña.
     */
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            res.json({ 
                success: true, 
                message: `Si el correo ${email} existe en nuestro sistema, recibirá instrucciones de recuperación.`
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AuthController;