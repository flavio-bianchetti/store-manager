const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');
const { products } = require('../mocks/StoreManagerMock');

describe('Acessando o caminho "/products" ...', () => {
  before( async () => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  after( async () => {
    connection.execute.restore();
  });

  describe('renorna ...', () => {
    it('um objeto do tipo "array", e ...', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('não vazio.', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.not.empty;
    });
  });
});

describe('Acessando o caminho "/products/:id" ...', () => {
  it('não retorna produto se o "id" não for encontrado e ...', async () => {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response =  await ProductsModel.find(2);
    expect(response).to.be.an('undefined');
    connection.execute.restore();
  });

  it('retornar um produto se o "id" for encontrado.', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response =  await ProductsModel.find(1);
    expect(response).to.be.not.empty;
    connection.execute.restore();
  });
});

describe('Ao solicitar o cadastro de um novo produto,', () => {
  describe('insere o produto no banco de dados,', () => {

    before( async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after( async () => {
      connection.execute.restore();
    });

    it('retorna um objeto.', async () => {
      const response = await ProductsModel.create(products[0]);
      expect(response).to.be.an('object');
    });

    it('retorna o id do novo produto inserido.', async () => {
      const response = await ProductsModel.create(products[0]);
      expect(response.insertId).to.be.equal(1);
    });
  });
});
