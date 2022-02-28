const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');
const { products } = require('../mocks/StoreManagerMock');

describe('Acessando o caminho "/products" retorna', () => {
  beforeEach( async () => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  afterEach( async () => {
    connection.execute.restore();
  });

  it('um objeto do tipo "array".', async () => {
    const response = await ProductsModel.getAll();
    expect(response).to.be.an('array');
  });

  it('um objeto não vazio.', async () => {
    const response = await ProductsModel.getAll();
    expect(response).to.be.not.empty;
  });
});

describe('Acessando o caminho "/products/:id"', () => {
  it('não retorna produto se o "id" não for encontrado.', async () => {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response =  await ProductsModel.find(2);
    expect(response).to.be.an('undefined');
    connection.execute.restore();
  });

  it('retorna um produto se o "id" for encontrado.', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response =  await ProductsModel.find(1);
    expect(response).to.be.not.empty;
    connection.execute.restore();
  });
});

describe('Ao solicitar o cadastro de um novo produto', () => {
  const payload = {
    name: 'Produto Teste',
    quantity: 10,
  };

  beforeEach( async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach( async () => {
    connection.execute.restore();
  });

  describe('insere o produto no banco de dados', () => {

    it('retorna um objeto.', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.be.an('object');
    });

    it('retorna o id do novo produto inserido.', async () => {
      const response = await ProductsModel.create(payload);
      expect(response).to.have.a.property('id');
    });
  });
});
