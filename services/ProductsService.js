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

const update = async ({ id, name, quantity }) => {
  const findProductById = await find(id);
  const findProductByName = await findByName(name);
  console.log(findProductByName, findProductById);
  if (!findProductById) return [];

  if (findProductByName.length !== 0
    && findProductByName[0].id !== Number(id)) return false;

  const result = await ProductsModel.update({ id, name, quantity });

  if (result.affectedRows === 0) return false;

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  find,
  create,
  update,
};
