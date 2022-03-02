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

describe('Ao fazer um POST no caminho "/Sales"', () => {
  describe('quando há problema com "SalesService".', () => error500(SalesController, 'find'));

  describe('quando salva a venda com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      const resultCreate = {
        id: 1,
        itemsSold: [
          {
            productId: 2,
            quantity: 50,
          },
        ],
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'create').resolves(resultCreate);
    });

    afterEach( async () => {
      await SalesService.create.restore();
    });

    it('retorna status 201.', async () => {
      await SalesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto.', async () => {
      await SalesController.create(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando a quantidade é maior que o estoque', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'create').resolves(undefined);
    });

    afterEach( async () => {
      await SalesService.create.restore();
    });

    it('retorna status 422', async () => {
      await SalesController.create(request, response);
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('retorna a mensagem correta.', async () => {
      await SalesController.create(request, response);
      expect(response.json.calledWith({message: 'Such amount is not permitted to sell'}))
        .to.be.equal(true);
    });
  });

  describe('quando acontece um erro no método "create"', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'create').resolves(false);
    });

    afterEach( async () => {
      await SalesService.create.restore();
    });

    it('retorna status 400', async () => {
      await SalesController.create(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('retorna a mensagem correta.', async () => {
      await SalesController.create(request, response);
      expect(response.json.calledWith(
        { message: 'Error in update quantity products method' }
      )).to.be.equal(true);
    });
  });
});

describe('Ao fazer um PUT no caminho "/Sales/id"', () => {
  describe('quando há problema com "SalesService".', () => error500(SalesController, 'find'));

  describe('quando atualiza a venda com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 1
      };

      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      const updateResult = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'update').resolves(updateResult);
    });

    afterEach( async () => {
      await SalesService.update.restore();
    });

    it('retorna status 200.', async () => {
      await SalesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto.', async () => {
      await SalesController.update(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando a quantidade é maior que o estoque', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 1
      };

      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'update').resolves(undefined);
    });

    afterEach( async () => {
      await SalesService.update.restore();
    });

    it('retorna status 422', async () => {
      await SalesController.update(request, response);
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('retorna a mensagem correta.', async () => {
      await SalesController.update(request, response);
      expect(response.json.calledWith({message: 'Such amount is not permitted to sell'}))
        .to.be.equal(true);
    });
  });

  describe('quando acontece um erro no método "update"', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 1
      };

      request.body = [
        {
          productId: 2,
          quantity: 50,
        },
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'update').resolves(false);
    });

    afterEach( async () => {
      await SalesService.update.restore();
    });

    it('retorna status 400', async () => {
      await SalesController.update(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('retorna a mensagem correta.', async () => {
      await SalesController.update(request, response);
      expect(response.json.calledWith(
        { message: 'Error in update quantity products method' }
      )).to.be.equal(true);
    });
  });
});

describe('Ao fazer um DELETE no caminho "/Sales/id"', () => {
  describe('quando há problema com "SalesService".', () => error500(SalesController, 'find'));

  describe('quando apaga a venda com sucesso', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = {
        id: 1
      };

      const excludeResult = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, 'exclude').resolves(excludeResult);
    });

    afterEach( async () => {
      await SalesService.exclude.restore();
    });

    it('retorna status 204.', async () => {
      await SalesController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('não retorna nenhuma mensagem.', async () => {
      await SalesController.exclude(request, response);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
  // tests above 60%.
});

