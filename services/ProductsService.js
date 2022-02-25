const ProductsModel = require('../models/ProductsModel');

const findByName = async (name) => {
  const result = await ProductsModel.findByName(name);
  return result;
};

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result.sort((a, b) => a.id - b.id);
};

const find = async (id) => {
  const result = await ProductsModel.find(id);
  return result;
};

const create = async ({ name, quantity }) => {
  if (!name || !quantity) return false;

  const findProduct = await findByName(name);

  if (findProduct.length !== 0) return [];

  const result = await ProductsModel.create({ name, quantity });

  return result;
};

module.exports = {
  getAll,
  find,
  create,
};
