const apiRequestBuilder = require('@commercetools/api-request-builder');

const Repository = require('../base');

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
      serviceName = '';
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

    beforeAll(() => {
      spy = jest.spyOn(repository, 'getRequestBuilder');
    });

    beforeEach(() => {
      repository.requestBuilder();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should call getRequestBuilder', () => {
      expect(spy).toHaveBeenCalled();
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

  describe('getParams', () => {
    let query;
    let queryParams;

    describe('when no query', () => {
      beforeAll(() => {
        query = undefined;
      });

      beforeEach(() => {
        queryParams = repository.getParams(query);
      });

      it('should return an object with expand key and an empty array as value', () => {
        expect(queryParams).toEqual({ expand: [] });
      });
    });

    describe('when query', () => {
      beforeAll(() => {
        query = {
          expand: ['expandField1', 'expandField2'],
          anotherParam: 'value'
        };
      });

      beforeEach(() => {
        queryParams = repository.getParams(query);
      });

      it('should return an object with expand key and an array as value', () => {
        expect(queryParams).toEqual({
          expand: ['expandField1', 'expandField2']
        });
      });
    });
  });

  describe('get', () => {
    let requestBuilder;
    let requestBuilderMocked;
    let mockedService;
    let id;
    let query;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      requestBuilder = repository.requestBuilder;
      requestBuilderMocked = jest.fn(() => mockedService);
      repository.requestBuilder = requestBuilderMocked;
      id = 'testId';
      query = { expand: ['expandField1', 'expandField2'] };
      queryParams = { id, ...query };
    });

    beforeEach(async () => {
      res = await repository.get(id, query);
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
        method: 'GET'
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

  describe('update', () => {
    let requestBuilder;
    let requestBuilderMocked;
    let mockedService;
    let id;
    let version;
    let actions;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      requestBuilder = repository.requestBuilder;
      requestBuilderMocked = jest.fn(() => mockedService);
      repository.requestBuilder = requestBuilderMocked;
      id = 'testId';
      version = 1;
      actions = [{ action: 'setKey', value: 'testKey ' }];
      queryParams = { id, version };
    });

    beforeEach(async () => {
      res = await repository.update(id, version, actions);
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
        body: JSON.stringify({ version, actions })
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

  describe('delete', () => {
    let requestBuilder;
    let requestBuilderMocked;
    let mockedService;
    let id;
    let version;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      requestBuilder = repository.requestBuilder;
      requestBuilderMocked = jest.fn(() => mockedService);
      repository.requestBuilder = requestBuilderMocked;
      id = 'testId';
      version = 1;
      queryParams = { id, version };
    });

    beforeEach(async () => {
      res = await repository.delete(id, version);
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
        method: 'DELETE'
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

  describe('getQueryParams', () => {
    let query;
    let queryParams;

    describe('when no query', () => {
      beforeAll(() => {
        query = undefined;
      });

      beforeEach(() => {
        queryParams = repository.getQueryParams(query);
      });

      it('should return an object with where, expand and sort keys and an empty array as values', () => {
        expect(queryParams).toEqual({ where: [], expand: [], sort: [] });
      });
    });

    describe('when query', () => {
      describe('with sortBy and sortDirection', () => {
        beforeEach(() => {
          query = {
            where: [],
            expand: [],
            sortBy: 'createdAt',
            sortDirection: 'ASC'
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            where: [],
            expand: [],
            sort: [{ by: query.sortBy, direction: query.sortDirection }]
          });
        });
      });
      describe('with sort array', () => {
        beforeEach(() => {
          query = {
            where: [],
            expand: [],
            sort: [{ by: 'createdAt', direction: 'ASC' }]
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            where: [],
            expand: [],
            sort: query.sort
          });
        });
      });
      describe('with where', () => {
        beforeEach(() => {
          query = {
            where: ['param1="value1", param2="value2'],
            whereOperator: 'and'
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with where array', () => {
          expect(queryParams).toEqual({
            where: query.where,
            whereOperator: query.whereOperator,
            expand: [],
            sort: []
          });
        });
      });
      describe('with pagination', () => {
        beforeEach(() => {
          query = {
            page: 2,
            perPage: 50
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with page and perPage', () => {
          expect(queryParams).toEqual({
            where: [],
            page: query.page,
            perPage: query.perPage,
            expand: [],
            sort: []
          });
        });
      });

      describe('with expand', () => {
        beforeAll(() => {
          query = {
            expand: ['expandField1', 'expandField2']
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with expand key and an array as value', () => {
          expect(queryParams).toEqual({
            where: [],
            expand: query.expand,
            sort: []
          });
        });
      });
    });
  });

  describe('find', () => {
    let requestBuilder;
    let requestBuilderMocked;
    let mockedService;
    let query;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      requestBuilder = repository.requestBuilder;
      requestBuilderMocked = jest.fn(() => mockedService);
      repository.requestBuilder = requestBuilderMocked;
      query = { expand: ['expandField1', 'expandField2'] };
      queryParams = repository.getQueryParams(query);
    });

    beforeEach(async () => {
      res = await repository.find(query);
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
        method: 'GET'
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

  describe('findAll', () => {
    let repositoryCopy;
    let query;
    beforeAll(() => {
      query = { expand: ['expandField1', 'expandField2'], perPage: 7, page: 2 };
    });
    describe('when there is only one page', () => {
      beforeAll(() => {
        repositoryCopy = new Repository(connection);
        repositoryCopy.find = jest.fn(() =>
          Promise.resolve({
            limit: 500,
            offset: 0,
            count: 1,
            total: 1,
            results: [{ id: 'testId', version: 1 }]
          })
        );
      });

      beforeEach(async () => {
        await repositoryCopy.findAll(query);
      });

      test('should call service.find', () => {
        expect(repositoryCopy.find).toHaveBeenCalled();
      });

      test('should call service.find with query params but page = 1 and perPage = 500', () => {
        expect(repositoryCopy.find).toHaveBeenCalledWith({
          ...query,
          page: 1,
          perPage: 500
        });
      });
    });
    describe('when there is more than one page', () => {
      beforeAll(() => {
        repositoryCopy = new Repository(connection);
        const response1 = Promise.resolve({
          limit: 500,
          offset: 0,
          count: 500,
          total: 1001,
          results: [{ id: 'test', version: 1 }]
        });

        const response2 = Promise.resolve({
          limit: 500,
          offset: 500,
          count: 500,
          total: 1001,
          results: [{ id: 'test', version: 1 }]
        });

        const response3 = Promise.resolve({
          limit: 500,
          offset: 1000,
          count: 1,
          total: 1001,
          results: [{ id: 'test', version: 1 }]
        });

        repositoryCopy.find = jest
          .fn()
          .mockReturnValueOnce(response1)
          .mockReturnValueOnce(response2)
          .mockReturnValueOnce(response3);
      });

      beforeEach(async () => {
        await repositoryCopy.findAll(query);
      });

      test('should call service.find as many times as Math.ceil(total / perPage) - 1', () => {
        expect(repositoryCopy.find).toHaveBeenCalledTimes(3);
      });
    });
  });
});
