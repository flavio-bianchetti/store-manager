const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesService.getAll();
    return res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const find = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.find(id);
    if (sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAll,
  find,
};
