const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');
const { sales } = require('../mocks/StoreManagerMock');

describe('Ao acessar o caminho', () => {
  describe('GET "/sales" retorna', () => {
    before( async () => {
        sinon.stub(connection, 'execute').resolves([sales]);
    });

    after( async () => {
        connection.execute.restore();
    });

    it('um objeto do tipo "array", e ...', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.an('array');
    });

    it('não vazio.', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.not.empty;
    });
  });

  describe('GET "/sales/:id retorna" ...', () => {
    it('nenhuma a venda se o "id" não for encontrado e ...', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const response =  await SalesModel.find(2);
      expect(response).to.be.empty;
      connection.execute.restore();
    });

    it('um produto se o "id" for encontrado.', async () => {
      sinon.stub(connection, 'execute').resolves([sales[0]]);
      const response =  await SalesModel.find(1);
      expect(response).to.be.not.empty;
      connection.execute.restore();
    });
  });
});
