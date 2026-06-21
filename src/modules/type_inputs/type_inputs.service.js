const TypeInputsModel = require('./type_inputs.model');

const TYPE_CONFIG = {
    1:  { table: 'inputs_stuffing_stamps_downspouts', endpoint: 'inputs-stuffing', specs: ['internal_diameter', 'external_diameter', 'height'] },
    2:  { table: 'inputs_stamps', endpoint: 'inputs-stamps', specs: ['internal_diameter', 'external_diameter', 'height_a', 'height_b'] },
    3:  { table: 'inputs_oring', endpoint: 'inputs-oring', specs: ['internal_diameter', 'height'] },
    4:  { table: 'inputs_chemicals', endpoint: 'inputs-chemicals', specs: ['presentation', 'batch_date', 'production_test'] },
    5:  { table: 'inputs_bags', endpoint: 'inputs-bags', specs: ['height', 'width', 'art', 'caliber'] },
    6:  { table: 'inputs_cardboard', endpoint: 'inputs-cardboard', specs: ['height', 'width', 'caliber'] },
    7:  { table: 'inputs_cases', endpoint: 'inputs-cases', specs: ['caliber', 'armed'] },
    8:  { table: 'inputs_thermoplastics', endpoint: 'inputs-thermoplastics', specs: ['visual'] },
    9:  { table: 'inputs_cameras', endpoint: 'inputs-cameras', specs: ['thickness_a', 'thickness_b', 'thickness_c', 'thickness_d', 'ring_diameter_a', 'ring_diameter_b', 'ring_diameter_c', 'ring_diameter_d'] },
    10: { table: 'inputs_collars', endpoint: 'inputs-collars', specs: ['internal_diameter', 'height', 'joint'] }
};

const enrichType = (type) => {
    const config = TYPE_CONFIG[type.id];
    return {
        ...type,
        endpoint: config ? config.endpoint : null,
        specs: config ? config.specs : []
    };
};

const TypeInputsService = {
    getAll: async () => {
        const types = await TypeInputsModel.findAll();
        return types.map(enrichType);
    },

    getById: async (id) => {
        const result = await TypeInputsModel.findById(id);
        if (!result) throw new Error('Tipo de insumo no encontrado');
        return enrichType(result);
    },

    getInputsByTypeId: async (id) => {
        const config = TYPE_CONFIG[id];
        if (!config) throw new Error(`No existe configuración de tabla para el tipo de insumo con ID ${id}`);
        const inputs = await TypeInputsModel.findInputsByTable(config.table);
        return inputs.map(input => ({ ...input, type_inputs_id: id }));
    },

    getEndpointByTypeId: (id) => {
        const config = TYPE_CONFIG[id];
        return config ? config.endpoint : null;
    },

    getSpecsByTypeId: (id) => {
        const config = TYPE_CONFIG[id];
        return config ? config.specs : [];
    },

    getTableNameByTypeId: (id) => {
        const config = TYPE_CONFIG[id];
        return config ? config.table : null;
    },

    create: (data) => TypeInputsModel.create(data.name),

    update: async (id, data) => {
        const result = await TypeInputsModel.update(id, data.name);
        if (!result) throw new Error('No se pudo actualizar: Tipo de insumo no encontrado');
        return result;
    },

    delete: async (id) => {
        const result = await TypeInputsModel.delete(id);
        if (!result) throw new Error('No se pudo eliminar: Tipo de insumo no encontrado');
        return result;
    }
};

module.exports = TypeInputsService;