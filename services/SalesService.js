const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const updateQuantityProducts = async (arraySales) => {
  const products = await ProductsModel.getAll();
  const resultProducts = await arraySales
    .map(async (sale) => {
      const product = products.find((p) => p.id === sale.productId);
      const updateProduct = {
        id: product.id,
        name: product.name,
        quantity: product.quantity - sale.quantity,
      };
      const result = await ProductsModel.update(updateProduct);
      if (result.affectedRows === 0) return false;

      return sale;
    });
  
  if (resultProducts.length !== arraySales.length) return false;

  return true;
};

const existsQuantityOfProducts = async (arraySales) => {
  const products = await ProductsModel.getAll();
  const salesDetails = await arraySales
  .filter((sale) => {
    const product = products.find((p) => p.id === sale.productId);

    if (sale.quantity > product.quantity) return false;

    return sale;
  });

  if (salesDetails.find((sale) => sale === false)) return false;

  return salesDetails;
};

const findSale = async (id, productId) => {
  const sales = await SalesModel.find(Number(id));

  return sales.find((sale) => sale.productId === productId);
};

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const find = async (id) => {
  const result = await SalesModel.find(id);
  return result;
};

const create = async (arraySales) => {
  const result = await existsQuantityOfProducts(arraySales);

  if (result.length === 0) return undefined;

  const resultSales = await SalesModel.create(arraySales);
  if (resultSales.length === 0) return [];

  // em caso de erro abaixo, tem que fazer o rollback acima.
  // Não implementado.
  if (updateQuantityProducts(arraySales) === false) return false;

  return resultSales;
};

const update = async (sale) => {
  // verificar se a quantidade a ser atualizada é a mesma da venda,
  // não fazer nada. Não implementado.
  const saleDetails = await findSale(sale.id, sale.productId);
  if (saleDetails.length === 0) return [];

  const difference = saleDetails.quantity - sale.quantity;

  if (difference < 0 && !existsQuantityOfProducts([{
      productId: sale.productId,
      quantity: Math.abs(difference),
    }])) return undefined;

  const result = await SalesModel
    .update({
      saleId: Number(sale.id),
      productId: sale.productId,
      quantity: sale.quantity,
    });

  // em caso de erro abaixo, tem que fazer o rollback acima.
  // Não implementado.
  if (updateQuantityProducts([{
    productId: sale.productId,
    quantity: (difference * -1),
  }]) === false) return false;

  return result;
};

const exclude = async (id) => {
  // ao excluir uma venda, atualiza a quantidade em produtos.
  const sales = await SalesModel.find(Number(id));

  if (sales.length === 0) return undefined;

  const updateArraySales = sales.map((sale) => {
    const product = {
      date: sale.date,
      productId: sale.productId,
      quantity: (sale.quantity * -1),
    };
    return product;
  });

  if (updateQuantityProducts(updateArraySales) === false) return [];
  
  // em caso de erro abaixo, tem que fazer o rollback acima.
  // Não implementado.
  const result = await SalesModel.exclude(Number(id));
  if (!result) return false;

  return result;
};

module.exports = {
  getAll,
  find,
  create,
  update,
  exclude,
};
