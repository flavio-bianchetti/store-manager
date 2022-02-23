const sinon = require('sinon');
const chai = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');
const { products } = require('./mocks/StoreManagerMock');

describe('Listar os Produtos', () => {
  before( async () => {
    sinon.stub(connection, 'execute').resolves(products);
  });

  after( async () => {
    connection.execute.restore();
  });

  describe('Se acessado o caminho "/products" deve...', () => {
    it('não deve ser vazio.', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.not.empty;
    });

    it('retornar um array.', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('retornar um array com todos os produtos.', async () => {
      const response =  await ProductsModel.getAll();
      expect(response).to.be.equal(products);
    });
  });

  describe('Se acessado o caminho "/products/:id" deve...', () => {
    before( async () => {
        sinon.stub(connection, 'execute').resolves(products[0]);
      });
    
      after( async () => {
        connection.execute.restore();
      });

    it('retornar um array vazio se o "id" não for encontrado.', async () => {
      const response =  await ProductsModel.find(2);
      expect(response).to.be.empty;
    });

    it('retorne o produto se o "id" estiver correto.', async () => {
      const response =  await ProductsModel.find(1);
      expect(response).to.be.equal(products[0]);
    });
  });
});
