const error500 = { message: 'Internal Server Error' };

const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesService.getAll();

    return res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error500);
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
    return res.status(500).json(error500);
  }
};

const create = async (req, res) => {
  const arraySales = req.body;
  try {
    const sale = await SalesService.create(arraySales);
    
    if (sale === undefined) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
    
    if (sale === []) {
      return res.status(400).json({ message: 'Error in create sales method' });
    }

    if (sale === false) {
      return res.status(400).json({ message: 'Error in update quantity products method' });
    }

    return res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error500);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const [arraySale] = req.body;
  const { productId, quantity } = arraySale;
  try {
    const sale = await SalesService.update({ id, productId, quantity });

    if (sale === undefined) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }

    if (sale === []) return res.status(404).json({ message: 'Sale not found' });

    if (sale === false) {
      return res.status(400).json({ message: 'Error in update quantity products method' });
    }

    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error500);
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.exclude(id);

    if (sale === undefined) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    if (sale === []) {
      return res.status(400).json({ message: 'Error in update exclude method' });
    }

    if (sale === false) {
      return res.status(400).json({ message: 'Error in exclude method' });
    }

    return res.status(204).json();
  } catch (err) {
    console.error(err);
    return res.status(500).json(error500);
  }
};

module.exports = {
  getAll,
  find,
  create,
  update,
  exclude,
};
