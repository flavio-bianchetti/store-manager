const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  try {
    const products = await ProductsService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const find = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductsService.find(id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const product = await ProductsService.create({ name, quantity });
    if (product.length === 0) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    if (!product) {
      return res.status(402).json({ message: 'Payment Required' });
    }

    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAll,
  find,
  create,
};
