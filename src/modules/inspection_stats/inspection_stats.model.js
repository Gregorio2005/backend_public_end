const pool = require('../../config/db');

const INSPECTION_TABLES = [
  'inspection_bags',
  'inspection_cameras',
  'inspection_cardboard',
  'inspection_cases',
  'inspection_chemicals',
  'inspection_collars',
  'inspection_oring',
  'inspection_stamps',
  'inspection_stuffing_stamps_downspouts',
  'inspection_thermoplastics'
];

const InspectionStatsModel = {
  getStatusCounts: async () => {
    const unionQuery = INSPECTION_TABLES
      .map(table => `SELECT bill_inputs_id, status FROM public.${table}`)
      .join(' UNION ALL ');

    const query = `
      SELECT status, COUNT(*) as count
      FROM (
        SELECT DISTINCT ON (bill_inputs_id) bill_inputs_id, status
        FROM (${unionQuery}) AS all_inspections
        ORDER BY bill_inputs_id DESC
      ) AS latest_inspections
      GROUP BY status
    `;

    const { rows } = await pool.query(query);
    return rows;
  },

  getQualityStats: async ({ suppliers_id, type_inputs_id, fechaInicio, fechaFin }) => {
    const unionQuery = INSPECTION_TABLES
      .map(table => `SELECT bill_inputs_id, status, review_date FROM public.${table}`)
      .join(' UNION ALL ');

    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (suppliers_id) {
      conditions.push(`bd.suppliers_id = $${paramIndex++}`);
      params.push(parseInt(suppliers_id, 10));
    }
    if (type_inputs_id) {
      conditions.push(`mi.type_inputs_id = $${paramIndex++}`);
      params.push(parseInt(type_inputs_id, 10));
    }
    if (fechaInicio) {
      conditions.push(`ai.review_date >= $${paramIndex++}`);
      params.push(fechaInicio);
    }
    if (fechaFin) {
      conditions.push(`ai.review_date <= $${paramIndex++}`);
      params.push(fechaFin);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT ai.status, COUNT(*) as count
      FROM (${unionQuery}) AS ai
      JOIN public.bill_inputs bi ON ai.bill_inputs_id = bi.id
      JOIN public.bill_data bd ON bi.bill_data_id = bd.id
      JOIN public.master_inputs mi ON bi.master_inputs_id = mi.id
      ${whereClause}
      GROUP BY ai.status
    `;

    const { rows } = await pool.query(query, params);
    return rows;
  }
};

module.exports = InspectionStatsModel;
