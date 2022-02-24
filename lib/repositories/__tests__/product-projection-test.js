const apiRequestBuilder = require('@commercetools/api-request-builder');

const Repository = require('../product-projection');

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
      serviceName = 'productProjections';
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
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Product Projections doesn't allow CREATE"
        }
      };
    });

    beforeEach(() => {
      res = repository.create();
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

      it('should return an object without expand key', () => {
        expect(queryParams).toEqual({});
      });
    });

    describe('when query', () => {
      describe('when query contains expand key', () => {
        describe('when expand is an array', () => {
          beforeAll(() => {
            query = {
              expand: ['expand']
            };
          });

          beforeEach(() => {
            queryParams = repository.getParams(query);
          });

          it('should return an object with expand key and an array as value', () => {
            expect(queryParams).toEqual({
              expand: ['expand']
            });
          });
        });

        describe('when expand is not an array', () => {
          beforeAll(() => {
            query = {
              expand: 'expand'
            };
          });

          beforeEach(() => {
            queryParams = repository.getParams(query);
          });

          it('should return an object with expand key and an array as value', () => {
            expect(queryParams).toEqual({
              expand: ['expand']
            });
          });
        });
      });

      describe('with staged', () => {
        beforeAll(() => {
          query = { staged: true };
        });

        beforeEach(() => {
          queryParams = repository.getParams(query);
        });

        it('should return an object with staged = true', () => {
          expect(queryParams).toEqual({
            staged: query.staged
          });
        });
      });

      describe('with priceCountry', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCountry: 'ES' };
        });

        beforeEach(() => {
          queryParams = repository.getParams(query);
        });

        it('should return an object with priceCountry', () => {
          expect(queryParams).toEqual({
            ...query
          });
        });
      });

      describe('with priceCustomerGroup', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCustomerGroup: 'staff' };
        });

        beforeEach(() => {
          queryParams = repository.getParams(query);
        });

        it('should return an object with priceCustomerGroup', () => {
          expect(queryParams).toEqual({
            ...query
          });
        });
      });

      describe('with priceChannel', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceChannel: 'channel1' };
        });

        beforeEach(() => {
          queryParams = repository.getParams(query);
        });

        it('should return an object with priceChannel', () => {
          expect(queryParams).toEqual({
            ...query
          });
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
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Product Projections doesn't allow UPDATE"
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
          message: "Product Projections doesn't allow DELETE"
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
        expect(queryParams).toEqual({});
      });
    });

    describe('when query', () => {
      describe('with sortBy and sortDirection', () => {
        beforeEach(() => {
          query = {
            sortBy: 'createdAt',
            sortDirection: 'ASC'
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            sort: [{ by: query.sortBy, direction: query.sortDirection }]
          });
        });
      });

      describe('with sort array', () => {
        beforeEach(() => {
          query = {
            sort: [{ by: 'createdAt', direction: 'ASC' }]
          };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            sort: query.sort
          });
        });
      });

      describe('with where', () => {
        describe('when where is an array', () => {
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
              whereOperator: query.whereOperator
            });
          });
        });

        describe('when where is not an array', () => {
          beforeEach(() => {
            query = {
              where: 'param1="value1"',
              whereOperator: 'and'
            };
          });

          beforeEach(() => {
            queryParams = repository.getQueryParams(query);
          });

          it('should return an object with where array', () => {
            expect(queryParams).toEqual({
              where: [query.where],
              whereOperator: query.whereOperator
            });
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
            page: query.page,
            perPage: query.perPage
          });
        });
      });

      describe('with expand', () => {
        describe('when expand is an array', () => {
          beforeAll(() => {
            query = {
              expand: ['expand']
            };
          });

          beforeEach(() => {
            queryParams = repository.getQueryParams(query);
          });

          it('should return an object with expand key and an array as value', () => {
            expect(queryParams).toEqual({
              expand: query.expand
            });
          });
        });

        describe('when expand is not an array', () => {
          beforeAll(() => {
            query = {
              expand: 'expand'
            };
          });

          beforeEach(() => {
            queryParams = repository.getQueryParams(query);
          });

          it('should return an object with expand key and an array as value', () => {
            expect(queryParams).toEqual({
              expand: [query.expand]
            });
          });
        });
      });

      describe('with staged', () => {
        beforeAll(() => {
          query = { staged: true };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with staged = true', () => {
          expect(queryParams).toEqual({
            staged: query.staged
          });
        });
      });

      describe('with priceCountry', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCountry: 'ES' };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with priceCountry', () => {
          expect(queryParams).toEqual({
            ...query
          });
        });
      });

      describe('with priceCustomerGroup', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCustomerGroup: 'staff' };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with priceCustomerGroup', () => {
          expect(queryParams).toEqual({
            ...query
          });
        });
      });

      describe('with priceChannel', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceChannel: 'channel1' };
        });

        beforeEach(() => {
          queryParams = repository.getQueryParams(query);
        });

        it('should return an object with priceChannel', () => {
          expect(queryParams).toEqual({
            ...query
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

  describe('getSearchQueryParams', () => {
    let query;
    let queryParams;

    describe('when no query', () => {
      beforeAll(() => {
        query = undefined;
      });

      beforeEach(() => {
        queryParams = repository.getSearchQueryParams(query);
      });

      it('should return an object with where, expand and sort keys and an empty array as values', () => {
        expect(queryParams).toEqual({
          expand: [],
          sort: [],
          facet: [],
          filter: [],
          filterByFacets: [],
          filterByQuery: []
        });
      });
    });

    describe('when query', () => {
      describe('with sortBy and sortDirection', () => {
        beforeEach(() => {
          query = {
            expand: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: [],
            sortBy: 'createdAt',
            sortDirection: 'ASC'
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            expand: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: [],
            sort: [{ by: query.sortBy, direction: query.sortDirection }]
          });
        });
      });

      describe('with sort array', () => {
        beforeEach(() => {
          query = {
            expand: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: [],
            sort: [{ by: 'createdAt', direction: 'ASC' }]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with sort array', () => {
          expect(queryParams).toEqual({
            expand: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: [],
            sort: query.sort
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
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with page and perPage', () => {
          expect(queryParams).toEqual({
            page: query.page,
            perPage: query.perPage,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
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
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with expand key and an array as value', () => {
          expect(queryParams).toEqual({
            expand: query.expand,
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with staged', () => {
        beforeAll(() => {
          query = { staged: true };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with staged = true', () => {
          expect(queryParams).toEqual({
            staged: query.staged,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with priceCountry', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCountry: 'ES' };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with priceCountry', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with priceCustomerGroup', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceCustomerGroup: 'staff' };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with priceCustomerGroup', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with priceChannel', () => {
        beforeAll(() => {
          query = { priceCurrency: 'EUR', priceChannel: 'channel1' };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with priceChannel', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with text', () => {
        beforeAll(() => {
          query = {
            text: [
              { language: 'es', value: 'prueba' },
              { language: 'en', value: 'test' }
            ]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with text', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with fuzzy', () => {
        beforeAll(() => {
          query = { fuzzy: true };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with fuzzy = true', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with fuzzyLevel', () => {
        beforeAll(() => {
          query = { fuzzyLevel: 1 };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with fuzzyLevel = 1', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with filterByQuery', () => {
        beforeEach(() => {
          query = {
            filter: [
              'attribute1.param1: "value1"',
              'attribute3.param2: "value2"'
            ]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with filter array', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with filterByQuery', () => {
        beforeEach(() => {
          query = {
            filterByQuery: [
              'attribute1.param1: "value1"',
              'attribute3.param2: "value2"'
            ]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with filterByQuery array', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            filter: [],
            facet: [],
            filterByFacets: []
          });
        });
      });

      describe('with filterByFacets', () => {
        beforeEach(() => {
          query = {
            filterByFacets: [
              'attribute1.param1: "value1"',
              'attribute3.param2: "value2"'
            ]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with filterByFacets array', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            filter: [],
            facet: [],
            filterByQuery: []
          });
        });
      });

      describe('with facet', () => {
        beforeEach(() => {
          query = {
            facet: ['attribute1.param1', 'attribute3.param2']
          };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with filterByFacets array', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });

      describe('with markMatchingVariants', () => {
        beforeAll(() => {
          query = { markMatchingVariants: true };
        });

        beforeEach(() => {
          queryParams = repository.getSearchQueryParams(query);
        });

        it('should return an object with markMatchingVariants = true', () => {
          expect(queryParams).toEqual({
            ...query,
            expand: [],
            sort: [],
            facet: [],
            filter: [],
            filterByFacets: [],
            filterByQuery: []
          });
        });
      });
    });
  });

  describe('search', () => {
    let getRequestBuilder;
    let getRequestBuilderMocked;
    let mockedService;
    let query;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      getRequestBuilder = repository.getRequestBuilder;
      getRequestBuilderMocked = jest.fn(() => ({
        productProjectionsSearch: mockedService
      }));
      repository.getRequestBuilder = getRequestBuilderMocked;
      query = {
        text: [
          { language: 'es', value: 'prueba' },
          { language: 'en', value: 'test' }
        ]
      };
      queryParams = repository.getSearchQueryParams(query);
    });

    beforeEach(async () => {
      res = await repository.search(query);
    });

    afterAll(() => {
      repository.getRequestBuilder = getRequestBuilder;
    });

    it('should call connection.execute', () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it('should call connection.execute with params', () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: repository
          .getRequestBuilder()
          .productProjectionsSearch.parse(queryParams)
          .build(),
        method: 'GET'
      });
    });

    it('should call requestBuilder', () => {
      expect(repository.getRequestBuilder).toHaveBeenCalled();
    });

    it('should call getRequestBuilder().productProjectionsSearch.parse', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSearch.parse
      ).toHaveBeenCalled();
    });

    it('should call getRequestBuilder().productProjectionsSearch.parse with params', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSearch.parse
      ).toHaveBeenCalledWith(queryParams);
    });

    it('should call getRequestBuilder().productProjectionsSearch.build', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSearch.build
      ).toHaveBeenCalled();
    });

    describe('getSearchQueryParams', () => {
      let spy;

      beforeAll(() => {
        spy = jest.spyOn(repository, 'getSearchQueryParams');
      });

      beforeEach(async () => {
        await repository.search(query);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('should call getSearchQueryParams', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('should call getSearchQueryParams with params', () => {
        expect(spy).toHaveBeenCalledWith(query);
      });
    });

    it('should return response.body', () => {
      expect(res).toEqual(response.body);
    });
  });

  describe('getSuggestQueryParams', () => {
    let query;
    let queryParams;

    describe('when no query', () => {
      beforeAll(() => {
        query = undefined;
      });

      beforeEach(() => {
        queryParams = repository.getSuggestQueryParams(query);
      });

      it('should return an object with where, expand and sort keys and an empty array as values', () => {
        expect(queryParams).toEqual({ searchKeywords: undefined });
      });
    });

    describe('when query', () => {
      describe('with searchKeywords', () => {
        beforeEach(() => {
          query = {
            searchKeywords: [
              { language: 'es', value: 'prueba' },
              { language: 'en', value: 'test' }
            ]
          };
        });

        beforeEach(() => {
          queryParams = repository.getSuggestQueryParams(query);
        });

        it('should return an object searchKeywords', () => {
          expect(queryParams).toEqual(query);
        });
      });

      describe('with fuzzy', () => {
        beforeAll(() => {
          query = { fuzzy: true };
        });

        beforeEach(() => {
          queryParams = repository.getSuggestQueryParams(query);
        });

        it('should return an object with fuzzy = true', () => {
          expect(queryParams).toEqual(query);
        });
      });

      describe('with staged', () => {
        beforeAll(() => {
          query = { staged: true };
        });

        beforeEach(() => {
          queryParams = repository.getSuggestQueryParams(query);
        });

        it('should return an object with staged = true', () => {
          expect(queryParams).toEqual(query);
        });
      });

      describe('with limit', () => {
        beforeAll(() => {
          query = { limit: 100 };
        });

        beforeEach(() => {
          queryParams = repository.getSuggestQueryParams(query);
        });

        it('should return an object with staged = true', () => {
          expect(queryParams).toEqual({ perPage: query.limit });
        });
      });
    });
  });

  describe('suggest', () => {
    let getRequestBuilder;
    let getRequestBuilderMocked;
    let mockedService;
    let query;
    let queryParams;
    let res;

    beforeAll(() => {
      mockedService = {
        parse: jest.fn(() => mockedService),
        build: jest.fn()
      };
      getRequestBuilder = repository.getRequestBuilder;
      getRequestBuilderMocked = jest.fn(() => ({
        productProjectionsSuggest: mockedService
      }));
      repository.getRequestBuilder = getRequestBuilderMocked;
      query = {
        text: [
          { language: 'es', value: 'prueba' },
          { language: 'en', value: 'test' }
        ]
      };
      queryParams = repository.getSuggestQueryParams(query);
    });

    beforeEach(async () => {
      res = await repository.suggest(query);
    });

    afterAll(() => {
      repository.getRequestBuilder = getRequestBuilder;
    });

    it('should call connection.execute', () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it('should call connection.execute with params', () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: repository
          .getRequestBuilder()
          .productProjectionsSuggest.parse(queryParams)
          .build(),
        method: 'GET'
      });
    });

    it('should call requestBuilder', () => {
      expect(repository.getRequestBuilder).toHaveBeenCalled();
    });

    it('should call getRequestBuilder().productProjectionsSuggest.parse', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSuggest.parse
      ).toHaveBeenCalled();
    });

    it('should call getRequestBuilder().productProjectionsSuggest.parse with params', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSuggest.parse
      ).toHaveBeenCalledWith(queryParams);
    });

    it('should call getRequestBuilder().productProjectionsSuggest.build', () => {
      expect(
        repository.getRequestBuilder().productProjectionsSuggest.build
      ).toHaveBeenCalled();
    });

    describe('getSuggestQueryParams', () => {
      let spy;

      beforeAll(() => {
        spy = jest.spyOn(repository, 'getSuggestQueryParams');
      });

      beforeEach(async () => {
        await repository.suggest(query);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('should call getSuggestQueryParams', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('should call getSuggestQueryParams with params', () => {
        expect(spy).toHaveBeenCalledWith(query);
      });
    });

    it('should return response.body', () => {
      expect(res).toEqual(response.body);
    });
  });
});
