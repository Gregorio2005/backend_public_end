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

const TYPE_TO_TABLE = {
  1: 'inspection_stuffing_stamps_downspouts',
  2: 'inspection_stamps',
  3: 'inspection_oring',
  4: 'inspection_chemicals',
  5: 'inspection_bags',
  6: 'inspection_cardboard',
  7: 'inspection_cases',
  8: 'inspection_thermoplastics',
  9: 'inspection_cameras',
  10: 'inspection_collars'
};

const TYPE_TO_INPUTS_TABLE = {
  1: 'inputs_stuffing_stamps_downspouts',
  2: 'inputs_stamps',
  3: 'inputs_oring',
  4: 'inputs_chemicals',
  5: 'inputs_bags',
  6: 'inputs_cardboard',
  7: 'inputs_cases',
  8: 'inputs_thermoplastics',
  9: 'inputs_cameras',
  10: 'inputs_collars'
};

const ManufacturingFlowModel = {
  getCurrentMonthData: async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const billsQuery = `
      SELECT bd.id, bd.bill_nro, bd.odoo, bd.receipt_date, bd.billing_date,
             s.name as supplier_name
      FROM public.bill_data bd
      JOIN public.suppliers s ON s.id = bd.suppliers_id
      WHERE EXTRACT(YEAR FROM bd.receipt_date) = $1
        AND EXTRACT(MONTH FROM bd.receipt_date) = $2
      ORDER BY bd.receipt_date ASC
    `;
    const { rows: bills } = await pool.query(billsQuery, [year, month]);

    if (bills.length === 0) return [];

    const billIds = bills.map(b => b.id);

    const itemsQuery = `
      SELECT bi.*, bd.bill_nro, bd.odoo, bd.receipt_date, s.name as supplier_name,
             ti.name as type_name,
             mi.type_inputs_id, mi.inputs_id
      FROM public.bill_inputs bi
      JOIN public.bill_data bd ON bd.id = bi.bill_data_id
      JOIN public.suppliers s ON s.id = bd.suppliers_id
      JOIN public.master_inputs mi ON mi.id = bi.master_inputs_id
      JOIN public.type_inputs ti ON ti.id = mi.type_inputs_id
      WHERE bi.bill_data_id = ANY($1)
      ORDER BY bd.receipt_date ASC, bi.id ASC
    `;
    const { rows: items } = await pool.query(itemsQuery, [billIds]);

    if (items.length === 0) {
      return bills.map(b => ({ ...b, items: [] }));
    }

    const inspectionCountsQuery = `
      SELECT bill_inputs_id, COUNT(*) as count
      FROM (
        ${INSPECTION_TABLES.map(t => `SELECT bill_inputs_id FROM public.${t}`).join(' UNION ALL ')}
      ) AS all_inspections
      WHERE bill_inputs_id = ANY($1)
      GROUP BY bill_inputs_id
    `;
    const { rows: inspectionCounts } = await pool.query(inspectionCountsQuery, [items.map(i => i.id)]);

    const countsMap = {};
    inspectionCounts.forEach(c => { countsMap[c.bill_inputs_id] = parseInt(c.count); });

    const billsMap = {};
    bills.forEach(b => { billsMap[b.id] = { ...b, items: [] }; });

    items.forEach(item => {
      if (billsMap[item.bill_data_id]) {
        billsMap[item.bill_data_id].items.push({
          id: item.id,
          oem_number: item.oem_number,
          quantity: parseFloat(item.quantity),
          type_name: item.type_name,
          type_inputs_id: item.type_inputs_id,
          inputs_id: item.inputs_id,
          inspection_count: countsMap[item.id] || 0
        });
      }
    });

    return Object.values(billsMap);
  }
};

module.exports = ManufacturingFlowModel;
