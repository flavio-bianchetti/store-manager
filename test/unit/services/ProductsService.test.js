const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsService = require('../../../services/ProductsService');
const { products } = require('../mocks/StoreManagerMock');

const productsList = [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20
  }
];

const productItem = {
  "id": 1,
  "name": "produto A",
  "quantity": 10
};

describe('Acessando o caminho "/products"...', () => {
  before( async () => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  after( async () => {
    connection.execute.restore();
  });

  describe('renorna ...', () => {
    it('a quantidade correta de produtos, ...', async () => {
      const response = await ProductsService.getAll();
      expect(response).to.be.length(2);
    });

    it('um array com os produtos corretos e ...', async () => {
      const response = await ProductsService.getAll();
      expect(response[0].name).to.be.eql(productsList[0].name);
      expect(response[1].name).to.be.eql(productsList[1].name);
    });

    it('ordenados por "id" de forma crescente.', async () => {
        const response = await ProductsService.getAll();
        expect(response[0].id).to.be.eql(productsList[0].id);
        expect(response[1].id).to.be.eql(productsList[1].id);
      });
  });
});

describe('Acessando o caminho "/products/:id", ...', () => {

  before( async () => {
    sinon.stub(connection, 'execute').resolves([products[0]]);
  });

  after( async () => {
    connection.execute.restore();
  });

  describe('renorna ...', () => {
    it('a quantidade correta de produtos e ...', async () => {
      const response =  await ProductsService.find(1);
      expect([response]).to.be.length(1);
    });

    it('o produto corretor para o "id" informado.', async () => {
      const response =  await ProductsService.find(1);
      expect(response).to.be.eql(productItem);
    });
  });
});
