const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT p.id AS saleId, p.date, '
    + 'sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales AS p '
    + 'INNER JOIN StoreManager.sales_products AS sp '
    + 'ON p.id = sp.sale_id ' 
    + 'ORDER BY p.id, sp.product_id;',
  );

  return result;
};

const find = async (id) => {
  const [result] = await connection.execute(
    'SELECT p.id AS saleId, p.date, '
    + 'sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales AS p '
    + 'INNER JOIN StoreManager.sales_products AS sp '
    + 'ON p.id = sp.sale_id ' 
    + 'WHERE p.id = ? '
    + 'ORDER BY p.id, sp.product_id;',
    [id],
  );

  return result;
};

module.exports = {
  getAll,
  find,
};
