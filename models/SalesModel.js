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
    'SELECT p.date, '
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

const create = async (arraySales) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  const saleId = result.insertId;

  arraySales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products '
      + '(sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, sale.productId, sale.quantity],
    );
  });

  return {
    id: saleId,
    itemsSold: [
      ...arraySales,
    ],
  };
};

const update = async ({ saleId, productId, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products '
    + 'SET quantity = ? '
    + 'WHERE sale_id = ? AND product_id = ?;',
    [quantity, saleId, productId],
  );

  if (result.affectedRows === 0) return false;

  return {
    saleId,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const exclude = async (id) => {
  const [s] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE '
    + 'id = ?;',
    [id],
  );

  if (s.affectedRows === 0) return false;

  return s.affectedRows;
};

module.exports = {
  getAll,
  find,
  create,
  update,
  exclude,
};
