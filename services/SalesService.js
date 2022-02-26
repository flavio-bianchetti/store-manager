const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const find = async (id) => {
  const result = await SalesModel.find(id);
  return result;
};

const create = async (arraySales) => {
  // verificar se há quantidade suficiente de produtos.

  const result = await SalesModel.create(arraySales);

  if (result.length === 0) return [];

  // fazer update da quantidade dos produtos.

  return result;
};

const update = async (sale) => {
  // verificar se há quantidade suficiente de produtos.

  const result = await SalesModel
    .update({
      saleId: Number(sale.id),
      productId: Number(sale.productId),
      quantity: Number(sale.quantity),
    });

  if (result.affectedRows === 0) return false;

  // fazer update da quantidade dos produtos.

  return result;
};

module.exports = {
  getAll,
  find,
  create,
  update,
};
