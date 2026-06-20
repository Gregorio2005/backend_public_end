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
      .map(table => `SELECT status, observation FROM public.${table}`)
      .join(' UNION ALL ');

    const query = `
      SELECT status, COUNT(*) as count
      FROM (${unionQuery}) AS all_inspections
      GROUP BY status
    `;

    const { rows } = await pool.query(query);
    return rows;
  }
};

module.exports = InspectionStatsModel;
