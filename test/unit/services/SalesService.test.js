const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');
const ProductsModel = require('../../../models/ProductsModel');
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

  describe('POST "/sales" retorna', () => {
    const updateResult = {
      affectedRows: 1,
    };

    const productsResult = [
      {
        id: 2,
        name: 'product 2',
        quantity: 100,
      },
    ];

    const arraySales = [
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

    beforeEach(() => {
        sinon.stub(SalesModel, 'create').resolves(resultCreate);
        sinon.stub(ProductsModel, 'getAll').resolves(productsResult);
        sinon.stub(ProductsModel, 'update').resolves(updateResult);
    });

    afterEach( async () => {
        SalesModel.create.restore();
        ProductsModel.getAll.restore();
        ProductsModel.update.restore();
    });

    it('um objeto.', async () => {
      const response =  await SalesService.create(arraySales);
      expect(response).to.be.an('object');
    });

    it('com a propriedade "id".', async () => {
      const response =  await SalesService.create(arraySales);
      expect(response).to.be.have.property('id');
    });
  });

  describe('PUT "/sales" retorna', () => {
    const findResult = [
      {
        productId: 2,
        date: '2022-03-02 15:17:32',
        quantity: 4,
      },
    ];

    const updateProductsResult = {
      affectedRows: 1,
    };

    const productsResult = [
      {
        id: 2,
        name: 'product 2',
        quantity: 100,
      },
    ];

    const sale = {
      saleId: 1,
      productId: 2,
      quantity: 5,
    };

    const updateSalesResult = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    beforeEach(() => {
        sinon.stub(SalesModel, 'find').resolves(findResult);
        sinon.stub(SalesModel, 'update').resolves(updateSalesResult);
        sinon.stub(ProductsModel, 'getAll').resolves(productsResult);
        sinon.stub(ProductsModel, 'update').resolves(updateProductsResult);
    });

    afterEach( async () => {
        SalesModel.find.restore();
        SalesModel.update.restore();
        ProductsModel.getAll.restore();
        ProductsModel.update.restore();
    });

    it('um objeto.', async () => {
      const response =  await SalesService.update(sale);
      expect(response).to.be.an('object');
    });

    it('com a propriedade "saleId".', async () => {
      const response =  await SalesService.update(sale);
      expect(response).to.be.have.property('saleId');
    });
  });

  describe('DELETE "/sales/id" retorna', () => {
    const saleId = 1;

    const affectedRows = 1;

    const updateProductsResult = {
      affectedRows: 1,
    };

    const findResult = [
      {
        productId: 2,
        date: '2022-03-02 15:17:32',
        quantity: 4,
      },
    ];

    const productsResult = [
      {
        id: 2,
        name: 'product 2',
        quantity: 100,
      },
    ];

    const excludeResult = 1;

    beforeEach(() => {
        sinon.stub(SalesModel, 'find').resolves(findResult);
        sinon.stub(SalesModel, 'exclude').resolves(excludeResult);
        sinon.stub(ProductsModel, 'getAll').resolves(productsResult);
        sinon.stub(ProductsModel, 'update').resolves(updateProductsResult);
    });

    afterEach( async () => {
        SalesModel.find.restore();
        SalesModel.exclude.restore();
        ProductsModel.getAll.restore();
        ProductsModel.update.restore();
    });

    it('um "number".', async () => {
      const response =  await SalesService.exclude(saleId);
      expect(response).to.be.an('number');
    });

    it('com a propriedade "saleId".', async () => {
      const response =  await SalesService.exclude(saleId);
      expect(response).to.be.equal(affectedRows);
    });
  });
});
