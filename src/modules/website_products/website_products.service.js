const WebsiteProductsModel = require('./website_products.model');

const MAX_SLOTS = 6;

const WebsiteProductsService = {
    getActive: () => WebsiteProductsModel.findActive(),

    getAll: () => WebsiteProductsModel.findAll(),

    getById: async (id) => {
        const product = await WebsiteProductsModel.findById(id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    },

    create: async (data) => {
        const total = await WebsiteProductsModel.count();
        if (total >= MAX_SLOTS) {
            throw new Error(`No se pueden crear más de ${MAX_SLOTS} productos (slots agotados)`);
        }
        return WebsiteProductsModel.create(data);
    },

    update: async (id, data) => {
        const existing = await WebsiteProductsModel.findById(id);
        if (!existing) throw new Error('Producto no encontrado');
        return WebsiteProductsModel.update(id, data);
    },

    delete: async (id) => {
        const existing = await WebsiteProductsModel.findById(id);
        if (!existing) throw new Error('Producto no encontrado');
        return WebsiteProductsModel.delete(id);
    }
};

module.exports = WebsiteProductsService;
