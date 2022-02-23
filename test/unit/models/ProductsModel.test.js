const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');
const { products } = require('./mocks/StoreManagerMock');

describe('Listar todos os Produtos acessando o caminho "/products" e ...', () => {
  before( async () => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  after( async () => {
    connection.execute.restore();
  });

  describe('renornar ...', () => {
    it('um objeto do tipo "array", ...', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('não vazio e ...', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.not.empty;
    });

    it('com todos os produtos.', async () => {
      const response =  await ProductsModel.getAll();
      expect(response).to.be.eql(products);
    });
  });
});

describe('Listar um Produto acessando o caminho "/products/:id" e ...', () => {
  it('retornar um array vazio se o "id" não for encontrado e ...', async () => {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response =  await ProductsModel.find(2);
    expect(response).to.be.empty;
    connection.execute.restore();
  });

  it('retornar o produto se o "id" for encontrado.', async () => {
    sinon.stub(connection, 'execute').resolves([products[0]]);
    const response =  await ProductsModel.find(1);
    expect(response).to.be.eql(products[0]);
    connection.execute.restore();
  });
});
