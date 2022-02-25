const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const find = async (id) => {
  const result = await SalesModel.find(id);
  return result;
};

module.exports = {
  getAll,
  find,
};
