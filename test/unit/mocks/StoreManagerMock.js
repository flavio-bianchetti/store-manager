const products = [
  {
    "id": 1,
    "name": "Product A",
    "quantity": 10,
  },
  {
    "id": 2,
    "name": "Product B",
    "quantity": 20,
  },
];

const sales = [
  {
    "id": 1,
    "date": "2016-01-01 15:02:39",
  },
  {
    "id": 2,
    "date": "2020-11-09 07:45:14",
  },
];

const sales_products = [
  {
    "sale_id": 1,
    "product_id": 1,
    "quantity": 2,
  },
  {
    "sale_id": 1,
    "product_id": 2,
    "quantity": 4,
  },
  {
    "sale_id": 2,
    "product_id": 3,
    "quantity": 8,
  },
];

module.exports = {
  products,
  sales,
  sales_products,
};
