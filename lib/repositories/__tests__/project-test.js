const apiRequestBuilder = require("@commercetools/api-request-builder");

const Repository = require("../project");

describe("Repository", () => {
  const projectKey = "test";
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

  describe("service", () => {
    let serviceName;

    beforeEach(() => {
      serviceName = "project";
    });

    it("should return service name", () => {
      expect(Repository.service).toBe(serviceName);
    });
  });

  describe("getRequestBuilder", () => {
    let spy;
    let requestBuilder;

    beforeAll(() => {
      spy = jest.spyOn(apiRequestBuilder, "createRequestBuilder");
    });

    beforeEach(() => {
      requestBuilder = repository.getRequestBuilder();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("should call createRequestBuilder", () => {
      expect(spy).toHaveBeenCalled();
    });

    it(`should call createRequestBuilder with { projectKey: ${projectKey} }`, () => {
      expect(spy).toHaveBeenCalledWith({ projectKey });
    });

    it("should return requestBuilder", () => {
      expect(requestBuilder).toBeDefined();
    });
  });

  describe("requestBuilder", () => {
    let spy;
    let service;

    beforeAll(() => {
      spy = jest.spyOn(repository, "getRequestBuilder");
    });

    beforeEach(() => {
      service = repository.requestBuilder();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("should call getRequestBuilder", () => {
      expect(spy).toHaveBeenCalled();
    });

    it("should return requestBuilder service", () => {
      expect(service).toBeDefined();
    });
  });

  describe("create", () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Project doesn't allow CREATE"
        }
      };
    });

    beforeEach(() => {
      res = repository.create();
    });

    it("should throw an exception with status", () => {
      expect(res).rejects.toHaveProperty("status");
    });

    it("should throw an exception with body", () => {
      expect(res).rejects.toHaveProperty("body");
    });

    it("should throw an exception equal to error", () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe("getParams", () => {
    let query;
    let queryParams;

    describe("when no query", () => {
      beforeAll(() => {
        query = undefined;
      });

      beforeEach(() => {
        queryParams = repository.getParams(query);
      });

      it("should return an object with expand key and an empty array as value", () => {
        expect(queryParams).toEqual({ expand: [] });
      });
    });

    describe("when query", () => {
      beforeAll(() => {
        query = {
          expand: ["expandField1", "expandField2"],
          anotherParam: "value"
        };
      });

      beforeEach(() => {
        queryParams = repository.getParams(query);
      });

      it("should return an object with expand key and an array as value", () => {
        expect(queryParams).toEqual({
          expand: ["expandField1", "expandField2"]
        });
      });
    });
  });

  describe("get", () => {
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
      id = "testId";
      query = { expand: ["expandField1", "expandField2"] };
      queryParams = { id, ...query };
    });

    beforeEach(async () => {
      res = await repository.get(id, query);
    });

    afterAll(() => {
      repository.requestBuilder = requestBuilder;
    });

    it("should call connection.execute", () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it("should call connection.execute with params", () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: repository
          .requestBuilder()
          .parse(queryParams)
          .build(),
        method: "GET"
      });
    });

    it("should call requestBuilder", () => {
      expect(repository.requestBuilder).toHaveBeenCalled();
    });

    it("should call requestBuilder().parse", () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalled();
    });

    it("should call requestBuilder().parse with params", () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalledWith(
        queryParams
      );
    });

    it("should call requestBuilder().build", () => {
      expect(repository.requestBuilder().build).toHaveBeenCalled();
    });

    it("should return response.body", () => {
      expect(res).toEqual(response.body);
    });
  });

  describe("update", () => {
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
      id = "testId";
      version = 1;
      actions = [{ action: "setKey", value: "testKey " }];
      queryParams = { id, version };
    });

    beforeEach(async () => {
      res = await repository.update(id, version, actions);
    });

    afterAll(() => {
      repository.requestBuilder = requestBuilder;
    });

    it("should call connection.execute", () => {
      expect(repository.connection.execute).toHaveBeenCalled();
    });

    it("should call connection.execute with params", () => {
      expect(repository.connection.execute).toHaveBeenCalledWith({
        uri: repository
          .requestBuilder()
          .parse(queryParams)
          .build(),
        method: "POST",
        body: JSON.stringify({ version, actions })
      });
    });

    it("should call requestBuilder", () => {
      expect(repository.requestBuilder).toHaveBeenCalled();
    });

    it("should call requestBuilder().parse", () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalled();
    });

    it("should call requestBuilder().parse with params", () => {
      expect(repository.requestBuilder().parse).toHaveBeenCalledWith(
        queryParams
      );
    });

    it("should call requestBuilder().build", () => {
      expect(repository.requestBuilder().build).toHaveBeenCalled();
    });

    it("should return response.body", () => {
      expect(res).toEqual(response.body);
    });
  });

  describe("delete", () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Project doesn't allow DELETE"
        }
      };
    });

    beforeEach(() => {
      res = repository.delete();
    });

    it("should throw an exception with status", () => {
      expect(res).rejects.toHaveProperty("status");
    });

    it("should throw an exception with body", () => {
      expect(res).rejects.toHaveProperty("body");
    });

    it("should throw an exception equal to error", () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe("find", () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Project doesn't allow FIND"
        }
      };
    });

    beforeEach(() => {
      res = repository.find();
    });

    it("should throw an exception with status", () => {
      expect(res).rejects.toHaveProperty("status");
    });

    it("should throw an exception with body", () => {
      expect(res).rejects.toHaveProperty("body");
    });

    it("should throw an exception equal to error", () => {
      expect(res).rejects.toEqual(error);
    });
  });

  describe("findAll", () => {
    let error;
    let res;

    beforeAll(() => {
      error = {
        status: 405,
        body: {
          statusCode: 405,
          message: "Project doesn't allow FIND"
        }
      };
    });

    beforeEach(() => {
      res = repository.findAll();
    });

    it("should throw an exception with status", () => {
      expect(res).rejects.toHaveProperty("status");
    });

    it("should throw an exception with body", () => {
      expect(res).rejects.toHaveProperty("body");
    });

    it("should throw an exception equal to error", () => {
      expect(res).rejects.toEqual(error);
    });
  });
});
