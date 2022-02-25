const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');
const { products } = require('../mocks/StoreManagerMock');

describe('Ao fazer um GET no caminho "/products"', () => {
  describe('quando há problema com "ProductsService"', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      response.status = sinon.stub().returns(new Error());
      sinon.stub(ProductsService, 'getAll').resolves(false);
    });

    after( async () => {
      ProductsService.getAll.restore();
    });

    it('retorna o erro "500"', async () => {
      try {
        await ProductsController.getAll(request, response);
      } catch (err) {
        expect(response.status.calledWith(500)).to.be.equal(true);
      }
    });
  });

  describe('quando não há produtos cadastrados', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves([]);
    });

    after( async () => {
      ProductsService.getAll.restore();
    });

    it('retorna um array', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array vazio', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('quando há produtos cadastrados', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves(products);
    });

    after( async () => {
      ProductsService.getAll.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array não vazio', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao fazer um GET no caminho "/products/:id"', () => {
  describe('quando há problema com "ProductsService".', () => {
    const response = {};
    const request = {};

    before( async () => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(new Error());
      sinon.stub(ProductsService, 'find').resolves(false);
    });

    after( async () => {
      ProductsService.find.restore();
    });

    it('retorna o erro "500"', async () => {
      try {
        await ProductsController.find(request, response);
      } catch (err) {
        expect(response.status.calledWith(500)).to.be.equal(true);
      }
    });
  });

  describe('quando encontra o produto', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'find').resolves(products[0]);
    });

    after( async () => {
      ProductsService.find.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.find(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array não vazio', async () => {
      await ProductsController.find(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando não encontra o produto', () => {
    const response = [];
    const request = {};

    before(() => {
      request.body = {};
      request.params = {id: 2};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'find').resolves(false);
    });

    after( async () => {
      ProductsService.find.restore();
    });

    it('retorna status 404', async () => {
      await ProductsController.find(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um array vazio', async () => {
      await ProductsController.find(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
