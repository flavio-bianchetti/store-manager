const productIdSalesValidator = async (req, res, next) => {
  const sales = req.body;

  if (sales.find((sale) => !(Number.isInteger(sale.productId)))) {
    return res.status(400)
      .json({ message: '"productId" is required' }); 
  }

  next();
};

const quantitySalesValidator = async (req, res, next) => {
  const sales = req.body;
  if (sales.find((sale) => !(Number.isInteger(sale.quantity)))) {
    return res.status(400)
      .json({ message: '"quantity" is required' }); 
  }
  if (sales.find((sale) => sale.quantity <= 0)) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  next();
};

module.exports = {
  productIdSalesValidator,
  quantitySalesValidator,
};
