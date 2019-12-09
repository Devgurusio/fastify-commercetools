const { createRequestBuilder } = require("@commercetools/api-request-builder");

/**
 * Base class with common repository operations
 */
class BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "";
  }

  static get customService() {
    return {};
  }

  /**
   * @param {Connection} connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Returns a requestBuilder instance
   * @protected
   * @returns {Object}
   */
  getRequestBuilder() {
    return createRequestBuilder({
      projectKey: this.connection.projectKey,
      customServices: this.constructor.customService
    });
  }

  /**
   * Returns the requestBuilder service that corresponds to this repository
   * @protected
   * @returns {Object}
   */
  requestBuilder() {
    return this.getRequestBuilder()[this.constructor.service];
  }

  /**
   * Creates a new resource in commercetools
   * @param {Object} draft - resource draft
   * @param {Object} query - query parameters
   * @returns {Object} - the created resource
   */
  async create(draft, query) {
    const response = await this.connection.execute({
      uri: this.requestBuilder()
        .parse({ ...(query && this.getParams(query)) })
        .build(),
      method: "POST",
      body: JSON.stringify(draft)
    });
    return response.body;
  }

  /**
   * Returns the queryOne parameters
   * @protected
   * @param {Object} query
   * @param {string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   */
  getParams(query) {
    const { expand } = query || {};

    return { expand: [...(expand && expand.length ? expand : [])] };
  }

  /**
   * Gets a resource by id
   * @param {string} id - resource ID (it can be used also with id=`key={$key}`}
   * @param {Object} query - query parameters
   * @returns {Object} - the resource
   */
  async get(id, query) {
    const response = await this.connection.execute({
      uri: this.requestBuilder()
        .parse({ id, ...this.getParams(query) })
        .build(),
      method: "GET"
    });

    return response.body;
  }

  /**
   * Updates the resource with the given actions
   * @param {string} id - resource ID
   * @param {number} version - resource version
   * @param {Object[]} actions - actions array
   * @param {Object} query - query parameters
   * @returns {Object} - the updated resource
   */
  async update(id, version, actions, query) {
    const response = await this.connection.execute({
      uri: this.requestBuilder()
        .parse({ id, version, ...(query && this.getParams(query)) })
        .build(),
      method: "POST",
      body: JSON.stringify({ version, actions })
    });

    return response.body;
  }

  /**
   * Deletes the resource
   * @param {string} id - resource ID
   * @param {number} version - resource version
   * @param {Object} query - query parameters
   * @returns {Object} - the deleted resource
   */
  async delete(id, version, query) {
    const response = await this.connection.execute({
      uri: this.requestBuilder()
        .parse({ id, version, ...(query && this.getParams(query)) })
        .build(),
      method: "DELETE"
    });

    return response.body;
  }

  /**
   * Returns the query parameters
   * @protected
   * @param {Object} query
   * @param {string[]} query.where - array of where clauses
   * @param {string} query.whereOperator - where operator to join where clauses ("and" or "or")
   * @param {string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   * @param {string} query.page - page to return
   * @param {string} query.perPage - max resources per page
   * @param {Object[]} query.sort - sort clauses
   * @param {string} query.sort[].by - field to sort by
   * @param {string} query.sort[].direction - sort direction ("asc" or "desc")
   * @param {string} query.sortBy - Deprecated: field to sort by
   * @param {string} query.sortDirection - Deprecated: sort direction ("asc" or "desc")
   */
  getQueryParams(query) {
    const { where, whereOperator, expand, page, perPage } = query || {};
    let { sort, sortBy, sortDirection } = query || {};
    if (!sort || !sort.length) {
      sort = [];
    }
    if (sortBy) {
      sort.push({ by: sortBy, direction: sortDirection });
    }

    return {
      where: [...(where && where.length ? where : [])],
      sort,
      ...(whereOperator && { whereOperator }),
      ...(page && { page: parseInt(page, 10) }),
      ...(perPage && { perPage: parseInt(perPage, 10) }),
      expand: [...(expand && expand.length ? expand : [])]
    };
  }

  /**
   * Find resources that matches with the given query
   * @param {Object} query - query parameters
   * @returns {Object} - {@link https://docs.commercetools.com/http-api.html#pagedqueryresult|PagedQueryResult}
   */
  async find(query) {
    const response = await this.connection.execute({
      uri: this.requestBuilder()
        .parse(this.getQueryParams(query))
        .build(),
      method: "GET"
    });

    return response.body;
  }

  /**
   * Find all resources that matches with the given query
   * @param {Object} query - query parameters
   * @returns {Object} - {@link https://docs.commercetools.com/http-api.html#pagedqueryresult|PagedQueryResult}
   */
  async findAll(query) {
    const perPage = 500; // Max number of items per request in commercetools
    const params = {
      ...query,
      page: 1,
      perPage
    };

    const response = await this.find(params);
    const { results, total } = response;
    if (total > perPage) {
      const pagesLeft = Math.ceil(total / perPage) - 1;
      const requests = [...Array(pagesLeft).keys()].map((currentValue, index) =>
        this.find({ ...params, page: index + 2 })
      );
      const responses = await Promise.all(requests);

      return {
        total,
        limit: total,
        offset: 0,
        count: total,
        results: [
          ...results,
          ...responses.reduce(
            (accumulator, currentValue) => [
              ...accumulator,
              ...currentValue.results
            ],
            []
          )
        ]
      };
    }

    return response;
  }
}

module.exports = BaseRepository;
