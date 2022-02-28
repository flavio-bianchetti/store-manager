const sinon = require('sinon');
const { expect } = require('chai');
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');
const { sales } = require('../mocks/StoreManagerMock');

const error500 = (controller, method) => {
  describe('quando há problema com "ProductsService"', () => {
    const response = {
      status: 500,
      message: 'Internal Server Error',
    };
    const request = {};

    beforeEach(() => {
      sinon.stub(controller, method).resolves(response);
    });

    afterEach( async () => {
      await controller[method].restore();
    });

    it('retorna o erro "500"', async () => {
      const result = await controller[method](request, response);
      expect(result.status).to.be.equal(500);
    });
    it('retorna a mensagem "Internal Server Error"', async () => {
      const result = await controller[method](request, response);
      expect(result.message).to.be.equal('Internal Server Error');
    });
  });
};

describe('Ao fazer um GET no caminho "/Sales"', () => {
  describe('quando há problema com "SalesService"', () => error500(SalesController, 'getAll'));

  describe('quando não há vendas cadastradas', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json =sinon.stub().returns();
      sinon.stub(SalesService, 'getAll').resolves([]);
    });

    afterEach( async () => {
      await SalesService.getAll.restore();
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

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'getAll').resolves(sales);
    });

    afterEach( async () => {
      await SalesService.getAll.restore();
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
  describe('quando há problema com "SalesService".', () => error500(SalesController, 'find'));

  describe('quando encontra a venda', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'find').resolves(sales[0]);
    });

    afterEach( async () => {
      await SalesService.find.restore();
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

    beforeEach(() => {
      request.body = {};
      request.params = {id: 2};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'find').resolves([]);
    });

    afterEach( async () => {
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
