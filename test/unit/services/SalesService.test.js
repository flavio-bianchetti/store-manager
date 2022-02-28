const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');
const { sales } = require('../mocks/StoreManagerMock');


describe('Ao acessar o caminho', () => {
  describe('GET "/sales" retorna', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAll').resolves(sales);
    });

    afterEach( async () => {
      await SalesModel.getAll.restore();
    });

    it('a quantidade correta de vendas', async () => {
      const response = await SalesService.getAll();
      expect(response).to.be.length(2);
    });

    it('um array com as vendas corretas', async () => {
      const response = await SalesService.getAll();
      expect(response[0].productId).to.be.eql(sales[0].productId);
      expect(response[1].productId).to.be.eql(sales[1].productId);
    });

    it('ordenados por "id" de forma crescente.', async () => {
      const response = await SalesService.getAll();sales
      expect(response[0].saleId).to.be.eql(sales[0].saleId);
      expect(response[1].saleId).to.be.eql(sales[1].saleId);
    });
  });

  describe('GET "/sales/:id" retorna', () => {
    beforeEach(() => {
        sinon.stub(SalesModel, 'find').resolves(sales[0]);
    });

    afterEach( async () => {
        SalesModel.find.restore();
    });

    it('a quantidade correta de vendas', async () => {
      const response =  await SalesService.find(1);
      expect([response]).to.be.length(1);
    });

    it('a venda correta para o "id" informado.', async () => {
      const response =  await SalesService.find(1);
      expect(response).to.be.eql(sales[0]);
    });
  });
});
