const InspectionStatsModel = require('./inspection_stats.model');

const InspectionStatsController = {
  getStatusCounts: async (req, res, next) => {
    try {
      const rows = await InspectionStatsModel.getStatusCounts();
      const stats = { Aprobado: 0, Observacion: 0, Rechazado: 0, Incompleta: 0, 'Aprobado Observacion': 0, 'Rechazado Observacion': 0 };
      rows.forEach(row => { stats[row.status] = parseInt(row.count, 10); });
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = InspectionStatsController;
