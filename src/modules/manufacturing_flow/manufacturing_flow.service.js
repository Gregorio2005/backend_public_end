const ManufacturingFlowModel = require('./manufacturing_flow.model');

const ManufacturingFlowService = {
  getCurrentMonthData: () => ManufacturingFlowModel.getCurrentMonthData()
};

module.exports = ManufacturingFlowService;
