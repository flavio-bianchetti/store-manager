const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const { 
  nameProductValidator,
  quantityProductsValidator,
} = require('./middlewares/ProductsMiddleware');
const { 
  productIdSalesValidator,
  quantitySalesValidator,
} = require('./middlewares/SalesMiddleware');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAll);

app.get('/products/:id', ProductsController.find);

app.get('/sales', SalesController.getAll);

app.get('/sales/:id', SalesController.find);

app.post(
  '/products',
  nameProductValidator,
  quantityProductsValidator,
  ProductsController.create,
);

app.post('/sales', productIdSalesValidator, quantitySalesValidator);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
