const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');

  return result;
};

const find = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result[0];
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?;',
    [name],
  );
  return result;
};

const update = async ({ id, name, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, Number(quantity), Number(id)],
  );
  return result;
};

const exclude = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  find,
  create,
  findByName,
  update,
  exclude,
};
