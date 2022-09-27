const apiRequestBuilder = require('@commercetools/api-request-builder');

const Repository = require('../store');

describe('Repository', () => {
  const projectKey = 'test';
  const customServices = {
    stores: {
      endpoint: '/stores',
      features: [
        'create',
        'update',
        'delete',
        'query',
        'queryOne',
        'queryExpand'
      ],
      type: 'stores'
    }
  };
  let response = { statusCode: 200, body: { statusCode: 200 } };
  let connection;
  let repository;

  beforeAll(() => {
    connection = {
      projectKey,
      execute: jest.fn(async () => response)
    };
    repository = new Repository(connection);
  });

  describe('service', () => {
    let serviceName;

    beforeEach(() => {
      serviceName = 'stores';
    });

    it('should return service name', () => {
      expect(Repository.service).toBe(serviceName);
    });
  });

  describe('getRequestBuilder', () => {
    let spy;
    let requestBuilder;

    beforeAll(() => {
      spy = jest.spyOn(apiRequestBuilder, 'createRequestBuilder');
    });

    beforeEach(() => {
      requestBuilder = repository.getRequestBuilder();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should call createRequestBuilder', () => {
      expect(spy).toHaveBeenCalled();
    });

    it(`should call createRequestBuilder with { projectKey: ${projectKey} }`, () => {
      expect(spy).toHaveBeenCalledWith({ projectKey, customServices });
    });

    it('should return requestBuilder', () => {
      expect(requestBuilder).toBeDefined();
    });
  });

  describe('createCart', () => {
    let spy;
    const draft = {
      customerEmail: 'test@mail.com'
    };
    const storeKey = 'KEY-01';

    beforeAll(() => {
      spy = jest.spyOn(repository, 'requestCustomBuilder');
    });

    beforeEach(() => {
      repository.createCart(storeKey, draft);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should call requestCustomBuilder', () => {
      expect(spy).toHaveBeenCalled();
    });

    it(`should call requestCustomBuilder with key: ${storeKey}`, () => {
      expect(spy).toHaveBeenCalledWith(storeKey);
    });

    it('should call connection.execute', () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it('should call connection.execute with params', () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: '/test/in-store/key=KEY-01/carts',
        body: JSON.stringify(draft),
        method: 'POST'
      });
    });
  });
});
