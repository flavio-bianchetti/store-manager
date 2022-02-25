const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT p.saleId, p.date, sp.productId, sp.quantity '
    + '* FROM StoreManager.sales AS p '
    + 'INNER JOIN StoreManager.salesProducts AS sp '
    + 'ON p.saleId = sp.saleId ' 
    + 'ORDER BY p.saleId, sp.productId;',
  );

  return result;
};

const find = async (id) => {
  const [result] = await connection.execute(
    'SELECT p.saleId, p.date, sp.productId, sp.quantity '
    + '* FROM StoreManager.sales AS p '
    + 'INNER JOIN StoreManager.salesProducts AS sp '
    + 'ON p.saleId = sp.saleId ' 
    + 'WHERE p.saleId = ?;',
    [id],
  );

  return result;
};

module.exports = {
  getAll,
  find,
};
