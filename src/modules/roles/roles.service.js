const RolesModel = require('./roles.model');

const RolesService = {
    getAll: () => RolesModel.findAll(),

    getById: async (id) => {
        const role = await RolesModel.findById(id);
        if (!role) throw new Error('Rol no encontrado');
        return role;
    },

    create: (data) => RolesModel.create(data.name),

    update: async (id, data) => {
        const role = await RolesModel.update(id, data.name);
        if (!role) throw new Error('No se pudo actualizar: Rol no encontrado');
        return role;
    },

    delete: async (id) => {
        const role = await RolesModel.delete(id);
        if (!role) throw new Error('No se pudo eliminar: Rol no encontrado');
        return role;
    }
};

module.exports = RolesService;