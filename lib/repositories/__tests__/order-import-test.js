const apiRequestBuilder = require('@commercetools/api-request-builder');

const Repository = require('../order-import');

describe('Repository', () => {
  const projectKey = 'test';
  const customServices = {};
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
      serviceName = 'orderImport';
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

  describe('requestBuilder', () => {
    let spy;
    let service;

    beforeAll(() => {
      spy = jest.spyOn(repository, 'getRequestBuilder');
    });

    beforeEach(() => {
      service = repository.requestBuilder();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should call getRequestBuilder', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should return requestBuilder service', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    const queryParams = {};
    let requestBuilder;
    let requestBuilderMocked;
    let mockedService;
    let draft;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      requestBuilder = repository.requestBuilder;
      requestBuilderMocked = jest.fn(() => mockedService);
      repository.requestBuilder = requestBuilderMocked;
      draft = { key: 'testKey' };
    });

    beforeEach(async () => {
      res = await repository.create(draft);
    });

    afterAll(() => {
      repository.requestBuilder = requestBuilder;
    });

    it('should call connection.execute', () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it('should call connection.execute with params', () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: repository.requestBuilder().parse(queryParams).build(),
        method: 'POST',
        body: JSON.stringify(draft)
      });
    });

    it('should call requestBuilder', () => {
      expect(repository.requestBuilder).toHaveBeenCalled();
    });

    it('should call requestBuilder().parse', () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalled();
    });

    it('should call requestBuilder().parse with params', () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalledWith(
        queryParams
      );
    });

    it('should call requestBuilder().build', () => {
      expect(repository.requestBuilder().build).toHaveBeenCalled();
    });

    it('should return response.body', () => {
      expect(res).toEqual(response.body);
    });
  });

  describe('get', () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Order Import doesn't allow GET"
        }
      };
    });

    beforeEach(() => {
      res = repository.get();
    });

    it('should throw an exception with status', () => {
      expect(res).rejects.toHaveProperty('status');
    });

    it('should throw an exception with body', () => {
      expect(res).rejects.toHaveProperty('body');
    });

    it('should throw an exception equal to error', () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe('update', () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Order Import doesn't allow UPDATE"
        }
      };
    });

    beforeEach(() => {
      res = repository.update();
    });

    it('should throw an exception with status', () => {
      expect(res).rejects.toHaveProperty('status');
    });

    it('should throw an exception with body', () => {
      expect(res).rejects.toHaveProperty('body');
    });

    it('should throw an exception equal to error', () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe('delete', () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Order Import doesn't allow DELETE"
        }
      };
    });

    beforeEach(() => {
      res = repository.delete();
    });

    it('should throw an exception with status', () => {
      expect(res).rejects.toHaveProperty('status');
    });

    it('should throw an exception with body', () => {
      expect(res).rejects.toHaveProperty('body');
    });

    it('should throw an exception equal to error', () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe('find', () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Order Import doesn't allow FIND"
        }
      };
    });

    beforeEach(() => {
      res = repository.find();
    });

    it('should throw an exception with status', () => {
      expect(res).rejects.toHaveProperty('status');
    });

    it('should throw an exception with body', () => {
      expect(res).rejects.toHaveProperty('body');
    });

    it('should throw an exception equal to error', () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe('findAll', () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Order Import doesn't allow FIND"
        }
      };
    });

    beforeEach(() => {
      res = repository.findAll();
    });

    it('should throw an exception with status', () => {
      expect(res).rejects.toHaveProperty('status');
    });

    it('should throw an exception with body', () => {
      expect(res).rejects.toHaveProperty('body');
    });

    it('should throw an exception equal to error', () => {
      expect(res).rejects.toEqual(error);
    });
  });
});
