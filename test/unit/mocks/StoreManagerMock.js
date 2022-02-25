const products = [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10,
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20,
  },
];

const sales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];


module.exports = {
  products,
  sales,
};
