const sinon = require('sinon');
const { expect } = require('chai');
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');
const { sales } = require('../mocks/StoreManagerMock');

describe('Ao fazer um GET no caminho "/Sales"', () => {
  describe('quando há problema com "SalesService"', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      response.status = sinon.stub().returns(new Error());
      sinon.stub(SalesService, 'getAll').resolves(false);
    });

    after( async () => {
      SalesService.getAll.restore();
    });

    it('retorna o erro "500"', async () => {
      try {
        await SalesController.getAll(request, response);
      } catch (err) {
        expect(response.status.calledWith(500)).to.be.equal(true);
      }
    });
  });

  describe('quando não há vendas cadastradas', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'getAll').resolves([]);
    });

    after( async () => {
      SalesService.getAll.restore();
    });

    it('retorna um array', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array vazio', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('quando há vendas cadastradas', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'getAll').resolves(sales);
    });

    after( async () => {
      SalesService.getAll.restore();
    });

    it('retorna status 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array não vazio', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao fazer um GET no caminho "/Sales/:id"', () => {
  describe('quando há problema com "SalesService".', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(new Error());
      sinon.stub(SalesService, 'find').resolves(false);
    });

    after( async () => {
      SalesService.find.restore();
    });

    it('retorna o erro "500"', async () => {
      try {
        await SalesController.find(request, response);
      } catch (err) {
        expect(response.status.calledWith(500)).to.be.equal(true);
      }
    });
  });

  describe('quando encontra a venda', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'find').resolves(sales[0]);
    });

    after( async () => {
      SalesService.find.restore();
    });

    it('retorna status 200', async () => {
      await SalesController.find(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array não vazio', async () => {
      await SalesController.find(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando não encontra a venda', () => {
    const response = [];
    const request = {};

    before(() => {
      request.body = {};
      request.params = {id: 2};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'find').resolves([]);
    });

    after( async () => {
      SalesService.find.restore();
    });

    it('retorna status 404', async () => {
      await SalesController.find(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um array vazio', async () => {
      await SalesController.find(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
