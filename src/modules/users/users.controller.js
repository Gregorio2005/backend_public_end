const UsersService = require('./users.service');

const UsersController = {
    getAll: async (req, res, next) => {
        try {
            const users = await UsersService.getAllUsers();
            res.json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const user = await UsersService.getUserById(req.params.id);
            res.json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const result = await UsersService.createUser(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params; // ID del usuario desde la URL
            
            // Desestructuración de los datos validados del cuerpo de la petición
            const { 
                user, 
                name, 
                lastname, 
                ci, 
                email, 
                roles_id, 
                status 
            } = req.body;

            /**
             * ESPACIO PARA LA CONSULTA A LA BASE DE DATOS:
             * Se utiliza el servicio para realizar el UPDATE. 
             * El modelo ejecutará: 
             * UPDATE public.users SET "user"=$1, name=$2, lastname=$3, ci=$4, email=$5, roles_id=$6, status=$7 ... WHERE id=$8
             */
            const result = await UsersService.updateUser(id, { user, name, lastname, ci, email, roles_id, status });

            res.status(200).json({ 
                success: true, 
                message: 'Usuario actualizado con éxito',
                data: result 
            });
        } catch (error) {
            // El middleware global errorHandler capturará esto y responderá con 500
            // si no es un error controlado (como validación o duplicidad).
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await UsersService.deleteUser(req.params.id);
            res.json({ success: true, message: 'Usuario desactivado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = UsersController;