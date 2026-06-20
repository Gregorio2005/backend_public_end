const ManufacturingFlowService = require('./manufacturing_flow.service');

const ManufacturingFlowController = {
  getCurrentMonth: async (req, res, next) => {
    try {
      const data = await ManufacturingFlowService.getCurrentMonthData();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ManufacturingFlowController;
