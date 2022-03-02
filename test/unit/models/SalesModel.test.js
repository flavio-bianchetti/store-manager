const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');
const { sales } = require('../mocks/StoreManagerMock');

describe('Ao acessar o caminho', () => {
  describe('GET "/sales" retorna', () => {
    beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([sales]);
    });

    afterEach( async () => {
      await connection.execute.restore();
    });

    it('um objeto do tipo "array".', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.an('array');
    });

    it('um objeto não vazio.', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.not.empty;
    });
  });

  describe('GET "/sales/:id retorna"', () => {
    it('nenhuma a venda se o "id" não for encontrado.', async () => {
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

describe('Ao acessar o caminho', () => {
  describe('POST "/sales" retorna', () => {
    const saleId = 1;
    const result = {
      insertId: 1,
    };
    const arraySales = [
      {
        productId: 2,
        quantity: 50,
      },
    ];
    beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([result]);
    });

    afterEach( async () => {
      await connection.execute.restore();
    });

    it('um objeto.', async () => {
        const response = await SalesModel.create(arraySales);
        expect(response).to.be.an('object');
    });

    it('com o "id" da nova venda.', async () => {
        const response = await SalesModel.create(arraySales);
        expect(response.id).to.be.equal(saleId);
    });
  });
});

describe('Ao acessar o caminho', () => {
  describe('PUT "/sales" retorna', () => {
    const saleId = 2;
    const result = {
      affectedRows: 1,
    };
    const sale = {
      saleId: 2,
      productId: 1,
      quantity: 50,
    };

    beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([result]);
    });

    afterEach( async () => {
      await connection.execute.restore();
    });

    it('um objeto.', async () => {
        const response = await SalesModel.update(sale);
        expect(response).to.be.an('object');
    });

    it('com o "id" da nova venda.', async () => {
        const response = await SalesModel.update(sale);
        expect(response.saleId).to.be.equal(saleId);
    });
  });
});

describe('Ao acessar o caminho', () => {
  describe('DELETE "/sales" retorna', () => {
    const id = 2;
    const result = {
      affectedRows: 1,
    };

    beforeEach(() => {
        sinon.stub(connection, 'execute').resolves([result]);
    });

    afterEach( async () => {
      await connection.execute.restore();
    });

    it('um número.', async () => {
        const response = await SalesModel.exclude(id);
        expect(response).to.be.a('number');
    });

    it('o número correto.', async () => {
        const response = await SalesModel.exclude(id);
        expect(response).to.be.equal(1);
    });
  });
});