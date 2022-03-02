const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');
const { products } = require('../mocks/StoreManagerMock');

const productsList = [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20
  }
];

const productItem = {
  "id": 1,
  "name": "produto A",
  "quantity": 10
};

describe('Acessando o caminho "/products" retorna', () => {
  beforeEach(() => {
    sinon.stub(ProductsModel, 'getAll').resolves(products);
  });

  afterEach( async () => {
    await ProductsModel.getAll.restore();
  });

  it('a quantidade correta de produtos.', async () => {
    const response = await ProductsService.getAll();
    expect(response).to.be.length(2);
  });

  it('um array com os produtos corretos.', async () => {
    const response = await ProductsService.getAll();
    expect(response[0].name).to.be.eql(productsList[0].name);
    expect(response[1].name).to.be.eql(productsList[1].name);
  });

  it('ordenados por "id" de forma crescente.', async () => {
      const response = await ProductsService.getAll();
      expect(response[0].id).to.be.eql(productsList[0].id);
      expect(response[1].id).to.be.eql(productsList[1].id);
    });
});

describe('Acessando o caminho "/products/:id" retorna', () => {

  beforeEach(() => {
    sinon.stub(ProductsModel, 'find').resolves(products[0]);
  });

  afterEach( async () => {
    await ProductsModel.find.restore();
  });

  it('a quantidade correta de produtos.', async () => {
    const response =  await ProductsService.find(1);
    expect([response]).to.be.length(1);
  });

  it('o produto correto para o "id" informado.', async () => {
    const response =  await ProductsService.find(1);
    expect(response).to.be.eql(productItem);
  });
});

describe('Ao solicitar o cadastro de um novo produto', () => {

  beforeEach(() => {
    sinon.stub(ProductsModel, 'find').resolves(products[0]);
  });

  afterEach( async () => {
    await ProductsModel.find.restore();
  });

  it('retorna um array com o produto.', async () => {
    const response =  await ProductsService.find(1);
    expect(response).to.be.not.empty;
  });
});

describe('Ao solicitar o cadastro de um novo produto', () => {

  beforeEach(() => {
    sinon.stub(ProductsModel, 'find').resolves([]);
  });

  afterEach( async () => {
    await ProductsModel.find.restore();
  });

  it('retorna um array vazio.', async () => {
    const response =  await ProductsService.find(1);
    expect(response).to.be.empty;
  });
});

describe('Ao solicitar o cadastro de um novo produto', () => {
  const payload = {};

  beforeEach(() => {
    sinon.stub(ProductsModel, 'create').resolves(false);
  });

  afterEach( async () => {
    await ProductsModel.create.restore();
  });

  it('retorna um boleano.', async () => {
    const response =  await ProductsService.create(payload);
    expect(response).to.be.a('boolean');
  });

  it('o boleano é "false".', async () => {
    const response =  await ProductsService.create(payload);
    expect(response).to.be.false;
  });
});

describe('Ao solicitar a atualização de um produto', () => {
  
  const payload = {
    id: 1,
    name: 'produto A',
    quantity: 10,
  };

  const findResult = {
    id: 1,
    name: 'produto A',
    quantity: 5,
  }

  const findByNameResult = [];

  const affectedRows = 1;

  beforeEach(() => {
    sinon.stub(ProductsModel, 'update').resolves({ affectedRows });
    sinon.stub(ProductsModel, 'find').resolves(findResult);
    sinon.stub(ProductsModel, 'findByName').resolves(findByNameResult);
  });

  afterEach( async () => {
    await ProductsModel.update.restore();
    await ProductsModel.find.restore();
    await ProductsModel.findByName.restore();
  });

  it('retorna um objeto.', async () => {
    const response =  await ProductsService.update(payload);
    expect(response).to.be.an('object');
  });

  it('o objeto possui a propriedade "id".', async () => {
    const response =  await ProductsService.update(payload);
    expect(response).to.have.property('id');
  });
});

describe('Ao solicitar excluir um produto', () => {
  
  const id = 1;

  const findResult = {
    id: 1,
    name: 'produto A',
    quantity: 5,
  }

  const excludeResult = 1;

  beforeEach(() => {
    sinon.stub(ProductsModel, 'exclude').resolves(excludeResult);
    sinon.stub(ProductsModel, 'find').resolves(findResult);
  });

  afterEach( async () => {
    await ProductsModel.exclude.restore();
    await ProductsModel.find.restore();
  });

  it('retorna um número.', async () => {
    const response =  await ProductsService.exclude(id);
    expect(response).to.be.an('number');
  });

  it('o número possui o valor correto.', async () => {
    const response =  await ProductsService.exclude(id);
    expect(response).to.be.equal(1);
  });
});
