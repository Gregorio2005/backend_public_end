const pool = require('../config/db');

/**
 * Ejecuta una query paginada con COUNT total.
 * @param {string} baseQuery - Query sin LIMIT/OFFSET (ej: 'SELECT * FROM users')
 * @param {Array} baseParams - Parámetros de la query base
 * @param {Object} options - { page: 1, limit: 10 }
 * @returns {Promise<{ data: Array, total: number, page: number, totalPages: number }>}
 */
const paginate = async (baseQuery, baseParams = [], { page = 1, limit = 10 } = {}) => {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const offset = (pageNum - 1) * limitNum;

    const countQuery = `SELECT COUNT(*)::int AS total FROM (${baseQuery}) AS _count`;
    const dataQuery = `${baseQuery} LIMIT $${baseParams.length + 1} OFFSET $${baseParams.length + 2}`;

    const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, baseParams),
        pool.query(dataQuery, [...baseParams, limitNum, offset])
    ]);

    const total = countResult.rows[0].total;
    const totalPages = Math.ceil(total / limitNum);

    return {
        data: dataResult.rows,
        total,
        page: pageNum,
        totalPages
    };
};

module.exports = { paginate };
