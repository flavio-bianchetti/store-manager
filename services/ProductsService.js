const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result.sort((a, b) => a.id - b.id);
};

const find = async (id) => {
  const result = await ProductsModel.find(id);
  return result;
};

module.exports = {
  getAll,
  find,
};
