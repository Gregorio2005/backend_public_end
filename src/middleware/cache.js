const NodeCache = require('node-cache');

const cache = new NodeCache();

const cacheMiddleware = (key, ttl) => {
    return (req, res, next) => {
        const cached = cache.get(key);
        if (cached) {
            return res.status(200).json(cached);
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            cache.set(key, body, ttl);
            return originalJson(body);
        };

        next();
    };
};

const clearCache = (key) => {
    cache.del(key);
};

module.exports = { cacheMiddleware, clearCache };
