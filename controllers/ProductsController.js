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

module.exports = {
  getAll,
  find,
};
