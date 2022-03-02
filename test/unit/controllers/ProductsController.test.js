const sinon = require('sinon');
const { expect } = require('chai');
const ProductsController = require('../../../controllers/ProductsController');
const ProductsService = require('../../../services/ProductsService');
const { products } = require('../mocks/StoreManagerMock');

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

describe('Ao fazer um GET no caminho "/products"', () => {
  describe('quando há problema com "ProductsService"', () => error500(ProductsController, 'getAll'));

  describe('quando não há produtos cadastrados', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves([]);
    });

    afterEach(() => {
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

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves(products);
    });

    afterEach(() => {
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
  
  describe('quando há problema com "ProductsService"', () =>  error500(ProductsController, 'find'));

  describe('quando encontra o produto', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'find').resolves(products[0]);
    });

    afterEach(() => {
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

    beforeEach(() => {
      request.body = {};
      request.params = {id: 2};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'find').resolves(false);
    });

    afterEach(() => {
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

describe('Ao fazer um POST no caminho "/products"', () => {
  
  describe('quando há problema com "ProductsService"', () =>  error500(ProductsController, 'create'));

  describe('quando salva o produto com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {
        name: 'Product B',
        quantity: 50,
      };

      const createResult = {
        id: 2,
        name: 'Product B',
        quantity: 50,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'create').resolves(createResult);
    });

    afterEach(() => {
      ProductsService.create.restore();
    });

    it('retorna status 201', async () => {
      await ProductsController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto não vazio', async () => {
      await ProductsController.create(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao fazer um PUT no caminho "/products/id"', () => {
  
  describe('quando há problema com "ProductsService"', () =>  error500(ProductsController, 'update'));

  describe('quando atualiza o produto com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 2,
      };

      request.body = {
        name: 'Product B',
        quantity: 50,
      };

      const updateResult = {
        id: 2,
        name: 'Product B',
        quantity: 55,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'update').resolves(updateResult);
    });

    afterEach(() => {
      ProductsService.update.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto não vazio', async () => {
      await ProductsController.update(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao fazer um DELETE no caminho "/products/id"', () => {
  
  describe('quando há problema com "ProductsService"', () =>  error500(ProductsController, 'exclude'));

  describe('quando remove o produto com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 2,
      };

      const excludeResult = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'exclude').resolves(excludeResult);
    });

    afterEach(() => {
      ProductsService.exclude.restore();
    });

    it('retorna status 204', async () => {
      await ProductsController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('não retorna nenhuma mensagem.', async () => {
      await ProductsController.exclude(request, response);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});
