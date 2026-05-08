const RolesModel = require('./roles_model');

const RolesService = {
    getAllRoles: async () => {
        return await RolesModel.findAll();
    },

    getRoleById: async (id) => {
        const role = await RolesModel.findById(id);
        if (!role) throw new Error('Rol no encontrado');
        return role;
    },

    createRole: async (name) => {
        // Aquí se podría agregar lógica de "no limitarse a un CRUD", 
        // como verificar si el nombre del rol ya existe antes de crearlo.
        return await RolesModel.create(name);
    },

    updateRole: async (id, name) => {
        const role = await RolesModel.update(id, name);
        if (!role) throw new Error('Rol no encontrado para actualizar');
        return role;
    },

    deleteRole: async (id) => {
        const role = await RolesModel.delete(id);
        if (!role) throw new Error('Rol no encontrado para eliminar');
        return role;
    }
};

module.exports = RolesService;