const apiRequestBuilder = jest.requireActual(
  "@commercetools/api-request-builder"
);
const apiRequestBuilderMocked = jest.genMockFromModule(
  "@commercetools/api-request-builder"
);
apiRequestBuilderMocked.features = apiRequestBuilder.features;
apiRequestBuilderMocked.createRequestBuilder = jest.fn(
  apiRequestBuilder.createRequestBuilder
);
module.exports = apiRequestBuilderMocked;
